import { BsSend } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi2";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";
import { useMessageContext } from "../../context/MessageContext";
import useUpdateMessage from "../../hooks/useUpdateMessage";

function MessageInput() {

    const [files, setFiles] = useState<FileList | null>(null);
    const { messageText, setMessageText, updateMessage, setUpdateMessage, messageId } = useMessageContext();

    const { loading, sendMessage } = useSendMessage();
    const { updateMessageFunc } = useUpdateMessage();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        
        if (messageText !== "") formData.append("message", messageText);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("filename", files[i]);
            }
        } 
        
        if (updateMessage) {
            setUpdateMessage(false);
            await updateMessageFunc(formData, messageId)
        } else {
            await sendMessage(formData);
        }

        setMessageText("");
        setFiles(null);
    }

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input 
                    type="text"
                    placeholder="Send a message"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-600 text-white"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />

                <div className="flex flex-row absolute inset-y-0 end-0 items-center pe-3 gap-2">
                    {files && files.length > 1 
                        ? (
                            <div>{(files[0].name).replace(/^(.{0,7}).*?(\.[^.]+)$/, "$1$2")}</div>
                        )
                        : (
                            <div>{files?.length} files</div>
                        )
                    }
                    <div>
                        <label htmlFor="inputFile">
                            <HiOutlinePaperClip className="w-6 h-6 cursor-pointer" />
                        </label>
                        <input 
                            type="file"
                            name="inputFile"
                            id="inputFile"
                            className="hidden"
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    </div>

                    <button type="submit">
                        {loading ? <span className="loading loading-spinner"></span> : <BsSend className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MessageInput;