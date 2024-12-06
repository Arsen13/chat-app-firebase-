import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { useAuthContext } from "../context/AuthContext";
import handleLoginInputs from "../utils/handleLoginInputs";
import axios from "axios";

type loginParams = {
    username: string,
    password: string
};

function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ username, password }: loginParams) => {

        const success = handleLoginInputs(username, password);
        if (!success) {
            return;
        }

        setLoading(true);

        try {
            const res = await axiosInstance.post("/api/auth/login", {
                username,
                password
            });

            const data = res.data;

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

    return { loading, login }
}

export default useLogin;