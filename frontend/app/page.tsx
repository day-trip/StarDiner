import {getMessages, sendChatMessage} from "@/app/backend/actions";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import('./page-client'), { ssr: false });

export default async function Home() {
  return <NoSSR a={getMessages} b={sendChatMessage}/>
}
