import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../store/useConversation";
import { FaFileAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import deleteMessage from "../../hooks/useDeleteMessage";

type MessageProps = {
    senderId: string,
    message?: string,
    link?: string,
    messageId: string
}

function Message({senderId, message, link, messageId}: MessageProps) {

    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();

    const fromMe = authUser?.id === senderId;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const messageBgColor = fromMe ? "bg-indigo-600" : "bg-emerald-700";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        src={profilePic}
                        alt="User avatar"
                    />
                </div>
            </div>
            <div className={`flex items-center gap-1 ${chatClassName == 'chat-start' ? 'flex-row-reverse' : ''}`}>
                <div className="flex flex-col gap-1">
                    <RxUpdate className="w-3.5 h-3.5 hover:text-amber-300"/>
                    <MdDeleteOutline 
                        className="w-3.5 h-3.5 hover:text-rose-700"
                        onClick={() => deleteMessage(messageId)}
                    />
                </div>
                {message && (
                    <div className={`chat-bubble text-white flex items-center ${messageBgColor}`}>
                        {message}
                    </div>
                )}

                {link && (
                    <div className={`chat-bubble text-white flex items-center ${messageBgColor}`}>
                        <a href={link} target="_blank">
                            <FaFileAlt className="w-7 h-7" />   
                            <p className="text-center">
                                {link.match(/\/([^\/]+?)(?=\?)/)?.[1].split('_')[0]
                                    .replace(/^(.{0,7}).*?(\.[^.]+)$/, "$1$2")} 
                            </p>
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Message;