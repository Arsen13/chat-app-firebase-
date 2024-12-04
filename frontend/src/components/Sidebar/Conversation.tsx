function Conversation() {
    return (
        <>
            <div className="flex gap-2 items-center hover:bg-indigo-600 rounded p-2 py-1 cursor-pointer">
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img 
                            src="https://avatar.iran.liara.run/public/boy?username=johndoe"
                            alt="User avatar"
                        />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-gray-200">John Doe</p>
                </div>
            </div>
            <div className="divider my-0 py-0 h-1"></div>
        </>
    )
}

export default Conversation;