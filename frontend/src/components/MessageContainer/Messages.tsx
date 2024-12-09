import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";

function Messages() {

    const { loading, messages } = useGetMessages();
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    useListenMessages();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 50)
    }, [messages])
    
    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messages.length > 0 
                && messages.map((message) => (
                    <div
                        key={message.id}
                        ref={lastMessageRef}
                    >
                        <Message senderId={message.senderId} message={message?.message} link={message?.link} messageId={message.id} />
                    </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} /> )}
            {!loading && messages.length === 0 && <p className="text-center my-4">Send a message to start a conversation</p>}
        </div>
    )
}

export default Messages;