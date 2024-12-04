import { BsSend } from "react-icons/bs";
import { HiOutlinePaperClip } from "react-icons/hi2";

function MessageInput() {
    return (
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input 
                    type="text"
                    placeholder="Send a message"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-900 border-gray-600 text-white"
                />

                <div className="flex flex-row absolute inset-y-0 end-0 items-center pe-3 gap-2">
                    <div>
                        <label htmlFor="inputFile">
                            <HiOutlinePaperClip className="w-6 h-6 cursor-pointer" />
                        </label>
                        <input 
                            type="file"
                            name="inputFile"
                            id="inputFile"
                            className="hidden"
                        />
                    </div>

                    <button type="submit">
                        <BsSend className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MessageInput;