import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../../store/useConversation";

function SearchInput() {
    const [searchValue, setSearchValue] = useState("");
    const { conversations, setConversations } = useConversation();
    const [allConversations, setAllConversations] = useState(conversations);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const value = e.target.value;
        setSearchValue(value);

        if (searchValue.length === 0) setConversations(allConversations);
        else {
            const filteredConv = allConversations.filter((conv: any) => conv.fullName.toLowerCase().includes(value.toLowerCase()))
            setConversations(filteredConv);
        }
    }

    useEffect(() => {
        if (conversations.length > 0 && allConversations.length === 0) {
            setAllConversations(conversations);
        }
    }, [conversations])

    return (
        <form className="flex items-center gap-2">
            <input 
                type="text" 
                placeholder="Search..."
                className="input input-bordered rounded-full"
                value={searchValue}
                onChange={handleChange}
            />

            <button type="submit" className="btn btn-circle bg-indigo-500 text-white hover:bg-indigo-700">
                <IoMdSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchInput;