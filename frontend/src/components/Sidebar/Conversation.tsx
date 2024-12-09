import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

type ConversationProps = {
    conversation: {
        id: string,
        fullName: string,
        profilePic: string,
        gender: string,
        username: string
    },
    lastIdx: boolean,
};

function Conversation({ conversation, lastIdx }: ConversationProps) {    
    
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?.id === conversation.id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation.id)

    return (
        <>
            <div 
                className={`flex gap-2 items-center hover:bg-indigo-600 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-indigo-600" : ""}`}
                onClick={() => setSelectedConversation(conversation)}    
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img 
                            src={conversation.profilePic}
                            alt="User avatar"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-200">{conversation.fullName}</p>
                </div>
            </div>
            <div className={lastIdx ? '' : 'divider my-0 py-0 h-1'}></div>
        </>
    )
}

export default Conversation;