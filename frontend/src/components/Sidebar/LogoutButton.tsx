import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

function LogoutButton() {

    const { logout } = useLogout();
    
    return (
        <div className="mt-auto">
            <CiLogout 
                className="w-6 h-6 text-white cursor-pointer" 
                onClick={logout}
            />
        </div>
    )
}

export default LogoutButton;