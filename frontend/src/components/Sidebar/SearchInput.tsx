import { IoMdSearch } from "react-icons/io";

function SearchInput() {
    return (
        <form className="flex items-center gap-2">
            <input 
                type="text" 
                placeholder="Search..."
                className="input input-bordered rounded-full"
            />

            <button type="submit" className="btn btn-circle bg-indigo-500 text-white hover:bg-indigo-700">
                <IoMdSearch className="w-6 h-6 outline-none" />
            </button>
        </form>
    )
}

export default SearchInput;