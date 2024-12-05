import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

function MessageContainer() {

    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null)
    }, [])

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? <NoChatSelected /> : (
                <>
                    <div className="bg-violet-500 px-4 py-2 mb-2">
                        <span className="label-text text-white">To: </span>
                        <span className="text-white font-semibold">{selectedConversation.fullName}</span>
                    </div>
            
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

export default MessageContainer;