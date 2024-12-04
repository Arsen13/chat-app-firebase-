import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar() {
    return (
        <div className="border-r border-slate-500 p-4 flex flex-col">
            <SearchInput />
            <div className="divider mt-1 mb-0"></div>
            <Conversations />
            <LogoutButton />
        </div>
    )
}

export default Sidebar;