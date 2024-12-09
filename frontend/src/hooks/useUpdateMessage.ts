import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function useUpdateMessage() {
    const [loading, setLoading] = useState(false);

    const updateMessageFunc = async (data: FormData, messageId: string) => {
        setLoading(true);
        try {
            await axiosInstance.patch(`/api/message/${messageId}`, data);
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

    return { loading, updateMessageFunc }
}

export default useUpdateMessage;