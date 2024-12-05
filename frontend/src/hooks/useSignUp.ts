import { useState } from "react";
import handleInputErrors from "../utils/handleInputErrors";
import axiosInstance from "../utils/axiosInstance";

type signupParams = {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
};

function useSignUp() {
    const [loading, setLoading] = useState(false);

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
            console.log(data);

        } catch (error: unknown) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup }
}

export default useSignUp;