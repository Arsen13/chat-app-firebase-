import { useState } from "react";
import handleInputErrors from "../utils/handleInputErrors";
import axiosInstance from "../utils/axiosInstance";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

type signupParams = {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
};

function useSignUp() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}: signupParams) => {
        const success = handleInputErrors({fullName, username, password, confirmPassword, gender});
        if (!success) return;

        setLoading(true);

        try {
            const res = await axiosInstance.post("/api/auth/signup", {
                fullName, 
                username, 
                password, 
                confirmPassword, 
                gender
            });

            const data = await res.data;
            
            localStorage.setItem("user-info", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error);
            } else {
                console.log(error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }
}

export default useSignUp;