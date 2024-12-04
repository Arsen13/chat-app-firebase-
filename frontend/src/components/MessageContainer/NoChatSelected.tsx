import { TiMessages } from "react-icons/ti";

function NoChatSelected() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome &#x1F44B; John Doe</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="w-14 h-14" />
            </div>
        </div>
    )
}

export default NoChatSelected;