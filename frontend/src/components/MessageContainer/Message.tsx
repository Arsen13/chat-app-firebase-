function Message() {
    return (
        <div className="chat chat-end">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        src="https://avatar.iran.liara.run/public/boy?username=johndoe"
                        alt="User avatar"
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white bg-violet-600 flex items-center`}>
                Hello! How are you?
            </div>
        </div>
    )
}

export default Message;