import { BsSend } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi2";
import useSendMessage from "../../hooks/useSendMessage";
import { ChangeEvent, useState } from "react";
import { useMessageContext } from "../../context/MessageContext";
import useUpdateMessage from "../../hooks/useUpdateMessage";

function MessageInput() {

    const [file, setFile] = useState<File | null>(null);
    const { messageText, setMessageText, updateMessage, setUpdateMessage, messageId } = useMessageContext();

    const { loading, sendMessage } = useSendMessage();
    const { updateMessageFunc } = useUpdateMessage();

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files) setFile(files[0]);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        
        if (messageText !== "") formData.append("message", messageText);
        if (file) formData.append("filename", file);
        
        if (updateMessage) {
            setUpdateMessage(false);
            await updateMessageFunc(formData, messageId)
        } else {
            await sendMessage(formData);
        }

        setMessageText("");
        setFile(null);
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
                    {file && (
                        <div>{(file.name).replace(/^(.{0,7}).*?(\.[^.]+)$/, "$1$2")}</div>
                    )}
                    <div>
                        <label htmlFor="inputFile">
                            <HiOutlinePaperClip className="w-6 h-6 cursor-pointer" />
                        </label>
                        <input 
                            type="file"
                            name="inputFile"
                            id="inputFile"
                            className="hidden"
                            onChange={handleChangeFile}
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