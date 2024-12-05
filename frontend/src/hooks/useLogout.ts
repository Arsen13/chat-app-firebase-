import { useAuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

function useLogout() {
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        try {
            await axiosInstance.post("/api/auth/logout");
            localStorage.removeItem("user-info");
            setAuthUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return { logout }
}

export default useLogout;