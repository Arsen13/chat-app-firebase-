import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../store/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })

        socket?.on("deleteMessage", (deletedMessageId) => {
            const filteredMessages = messages.filter(message => message.id !== deletedMessageId);
            setMessages(filteredMessages);
        })

        socket?.on("updateMessage", ({messageId, newMessage}) => {
            const filteredMessages = messages.map(message => {
                if (message.id === messageId) {
                    return {...message, message: newMessage};
                }
                return message
            });
            setMessages(filteredMessages);
        })

        return () => {
            socket?.off("newMessage");
            socket?.off("deleteMessage");
            socket?.off("updateMessage");
        }
    }, [socket, messages, setMessages])
}

export default useListenMessages;