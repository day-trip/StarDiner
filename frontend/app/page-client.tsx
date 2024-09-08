"use client";

import TextareaAutosize from 'react-textarea-autosize'
import { type KeyboardEvent, useEffect, useState } from 'react'
import {Message} from "@/app/types";
import Div100vh from "react-div-100vh";


const PLACEHOLDERS = [
    'Can I grab a cheeseburger?',
    'A quesadilla would be nice.',
    'May I please get a chicken taco?',
    'I\'d like a BLT',
]

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

export default function ClientHome({a, b}: {a: any, b: any}) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('')
    const [sessionId] = useState((typeof window !== "undefined" && typeof window.localStorage !== "undefined" ? window.localStorage.session_id : uuidv4()) || uuidv4())
    const [showingAbout, setShowingAbout] = useState(false)

    useEffect(() => {
        try {
            if (localStorage.session_id === sessionId) {
                if (localStorage.messages) {
                    setMessages(JSON.parse(localStorage.messages));
                }
            }
        } catch (e) {
            console.log("Caught error: " + e);
            console.log(e);
        }
        localStorage.session_id = sessionId;
        console.log("trying to get the messages");
        a(sessionId).then((messages: any) => {
            console.log("got the messages");
            console.log(messages);
            setMessages(JSON.parse(messages))
        })
    }, [sessionId])

    useEffect(() => {
        localStorage.messages = JSON.stringify(messages);
    }, [messages]);

    const submit = (): void => {
        if (message) {
            const idk = messages || [];
            setMessage('')
            setMessages([...idk, {
                role: 'user',
                content: message,
                timestamp: Date.now(),
            }]);
            b(message, sessionId).then((eeek: any) => {
                console.log(eeek);
                localStorage.name = eeek.name;
                setMessages([...idk, {
                    role: 'user',
                    content: message,
                    timestamp: Date.now(),
                }, {
                    role: 'assistant',
                    content: eeek.reply,
                    timestamp: Date.now(),
                }])
            });
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            submit()
        }
    }

    return <>
        <Div100vh
            className='flex flex-col items-center overflow-hidden relative pb-1.5 pt-0 text-white'
        >
            <div className="w-full px-2 flex flex-row justify-end pt-2">
                <button className="w-8 h-8 rounded-full cursor-pointer text-sky-300" title="About" onClick={() => setShowingAbout(showingAbout => !showingAbout)}>
                    {showingAbout ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                         stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                  stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                    </svg>
                    }
                </button>
            </div>
            {showingAbout ? <div className="w-full max-w-full sm:max-w-4xl px-4 overflow-y-auto fancy-scrollbar overflow-x-hidden">
                <AboutView/>
            </div> : <>
                {(messages ? messages.length : 0) > 1 ? <div
                    className='w-full flex-1 overflow-y-auto overflow-x-hidden fancy-scrollbar flex flex-row justify-center pb-4'
                >
                    <div
                        className='w-full max-w-full sm:max-w-4xl px-4'
                    >
                        {messages.map((message: Message, index: number) => <MessageView
                            key={index} message={message}
                        />)}
                    </div>
                </div> : <GreetingView/>}
                <div className='w-full max-w-full sm:max-w-4xl px-4 pt-4 flex flex-col items-center'>
                    <div className="w-full flex flex-row items-end">
                        <TextareaAutosize
                            onKeyDown={handleKeyDown} minRows={1} maxRows={10}
                            className='w-full rounded-3xl bg-gray-800 px-5 py-3 focus:outline-none shadow-sky-200/15 hover:shadow-sky-200/20 focus:shadow-sky-200/20 shadow-lg transition-shadow caret-sky-500 placeholder-sky-50 placeholder-opacity-40 focus:placeholder-opacity-20'
                            placeholder={PLACEHOLDERS[Math.floor(
                                Math.random() * PLACEHOLDERS.length
                            )]} value={message} onChange={e => setMessage(e.target.value)}
                        />
                        <button
                            onClick={submit}
                            className='rounded-full bg-gray-500 enabled:bg-gray-200 text-gray-950 p-1.5 ml-[-2.58rem] mb-1.5 transition-colors'
                            disabled={!message}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                strokeWidth={2} stroke='currentColor' className='size-6'
                            >
                                <path
                                    strokeLinecap='round' strokeLinejoin='round'
                                    d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm text-gray-300 pt-1.5">© 2024 The Packets LLC <a className="text-sky-300" href="/privacy">Privacy policy</a> | <a className="text-sky-300" href="/tos">Terms of service</a></p>
                </div>
            </>}
        </Div100vh>
        <div className='earth'></div>
        <div className='stars'></div>
    </>
}

function GreetingView() {
    const name: string | null = typeof localStorage === "undefined" ? null : localStorage.name;

    if (name) {
        return <div className="w-full flex-1 flex flex-col justify-center items-center max-w-4xl">
            <h1 className="text-3xl sm:text-6xl text-center mb-4">Good afternoon, {name}.</h1>
            <h1 className="text-3xl sm:text-6xl text-center mb-4">I'll help you order food today</h1>
        </div>
    }

    return <div className="w-full flex-1 flex flex-col justify-center items-center max-w-4xl">
        <h1 className="text-3xl sm:text-6xl text-center mb-4">Hey, I'm Kosmo!</h1>
        <h1 className="text-3xl sm:text-6xl text-center mb-4">I'll help you order food today</h1>
        <h1 className="text-3xl sm:text-6xl text-center">What's your name?</h1>
    </div>
}

function AboutView({}) {
    return <>
        <h1 className="text-sky-200 text-5xl font-semibold mb-6">Welcome to Spaceburger!</h1>

        <p className="mb-3 text-xl">
            The year is 2037, and millions of humans are living on space stations on low-earth orbit as well as mars and
            other planets in the Solar
            System. Spaceburger is a new human-friendly technology that moves the burden of managing food supplies and meal recipes away from
            mankind so that everyone is able to focus their attention onto expansion and rapid development of space technology.
        </p>

        <p className="mb-3 text-xl">
            As of now, one would place their food order at sd.jcc.lol. SpaceBurger clarifies their choices for optional
            ingredients (e.g., tomatoes in a cheeseburger) and checks whether there are enough quantities of the required
            ingredients in inventory at your location. If there is enough, SpaceBurger will send a order request.
        </p>

        <p className="mb-11 text-xl">
            SpaceBurger is also an inventory management system. Whenever an ingredient is used in an order, or was not available,
            SpaceBurger increments the restocking database for your location. Using this database, people are able to place restock orders
            to their space station or habitat.
        </p>

        <h1 className="text-sky-200 text-5xl font-semibold mb-6">Under the hood of SpaceBurger</h1>

        <p className="mb-3 text-xl">
            SpaceBurger uses GPT4-o to power the conversational interface for taking orders. We rely on GPT's inbuilt knowledge of
            recipes from its pre-training dataset. When you place an order for a cheeseburger, the LLM looks up the recipe to
            identify ingredients. If an optional ingredient is not available, it asks if that is ok. If a necessary
            ingredient is not available, it suggests alternatives. Currently, the suggested alternatives do not pre-check
            availability of ingredients, but this would be simple to implement and would make for a better CX.
        </p>

        <p className="mb-3 text-xl">
            In order to limit hallucinations, we prompt the LLM to return the required ingredients in a structured JSON format
            constructed from a pre-defined list of ingredients. We use function calling to query the inventory database and also
            to update the restocking database.
        </p>

        <p className="mb-3 text-xl">
            The front-end was implemented in React and NextJS. We used TailwindCSS and Typescript in our frontend as well. The architecture is fully serverless and deployed on an AWS stack (Route53,
            API Gateway, Lambda, DynamoDB, Amplify). Because of this, it can scale to millions of concurrent users without upfront costs.
        </p>

        <p className="mb-3 text-xl">
            This is a proof of concept. A real system would use RAG on a corpus of relevant recipes to increase accuracy; limit
            the list of ingredients based on what is practical in space; and use a much smaller fine-tuned model to minimize
            power needs.
        </p>
    </>
}

const MessageView = ({message}: {
    message: Message
}): React.JSX.Element => {
    switch (message.role) {
        case 'user': return <div
            className='bg-gray-800 rounded-2xl px-3 py-2 ml-auto w-fit mb-2.5 max-w-3xl mt-8'
        >{message.content}</div>

        case 'assistant': return <div className='mt-8'>{message.content}</div>
    }
}
