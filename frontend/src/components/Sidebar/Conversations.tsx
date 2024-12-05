import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

type ConversationParams = {
    fullName: string,
    gender: string,
    id: string,
    profilePic: string,
    username: string,
};

function Conversations() {

    const { loading, conversations } = useGetConversations();

    return (
        <div className="py-2 flex flex-col overflow-auto gap-0.5">
            {conversations && (conversations.map((conversation: ConversationParams, idx: number) => (
                <Conversation 
                    key={conversation.id} 
                    conversation={conversation}
                    lastIdx={idx === conversations.length - 1}
                />
            )))}

            {loading ? <span className="loading loading-spinner"></span> : null}
        </div>
    )
}

export default Conversations;