import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

function MessageContainer() {
    const noChatSelected = true;

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {noChatSelected ? <NoChatSelected /> : (
                <>
                    <div className="bg-violet-500 px-4 py-2 mb-2">
                        <span className="label-text text-white">To: </span>
                        <span className="text-white font-semibold">John Doe</span>
                    </div>
            
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

export default MessageContainer;