import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { type PrismaMessage, llmMessage, promptModel } from './chat'

const prisma = new PrismaClient().$extends(withAccelerate())


const getMessageHistory = (sessionId: bigint): Promise<PrismaMessage[]> =>
  prisma.messages.findMany({
    where: { session_id: sessionId },
    orderBy: [{ created_at: 'desc' }],
    cacheStrategy: {
      swr: 60,
      ttl: 60,
    },
  })

Bun.serve({
  async fetch(req: Request) {
    const url = new URL(req.url)
    switch (url.pathname) {
      case '/messages':
        if (req.method === 'GET') {
          const sessionId = url.searchParams.get('session_id')
          if (sessionId == null) return new Response(null, { status: 400 })

          return new Response(JSON.stringify(
            await getMessageHistory(BigInt(sessionId)),
            (_, col: any): any => typeof col === 'bigint' ? col.toString() : col
          ))
        }
        else return new Response(null, { status: 405 })

      case '/chat':
        if (req.method === 'POST') {
          if (req.headers.get(
            'Content-Type'
          ) != 'application/x-www-form-urlencoded' || req.body == null)
            return new Response(null, { status: 400 })

          // Read body
          const reader = req.body.getReader()
          let data = ''

          const processData = async ({ done, value }: {
            done: boolean, value?: any
          }): Promise<void> => {
            data += new TextDecoder().decode(<Uint8Array>value)
            if (!done) await reader.read().then(processData)
          }
          await reader.read().then(processData)
          const body = new URLSearchParams(data)

          const content = body.get('content')
          const id = body.get('session_id')
          if (content == null || id == null) return new Response(null, {
            status: 400
          })
          const sessionId = BigInt(id)

          // Send message
          await prisma.messages.create({ data: {
            session_id: sessionId,
            content,
            is_user: true,
          } })

          // Generate response
          const response = (await promptModel((await getMessageHistory(
            sessionId
          )).map(llmMessage))).choices.at(0)?.message.content || ''

          // Send response
          await prisma.messages.create({ data: {
            session_id: sessionId,
            content: response,
            is_user: false,
          } })

          return new Response(response)
        }
        else return new Response(null, { status: 405 })
    }
    return new Response(null, { status: 404 })
  },
})
