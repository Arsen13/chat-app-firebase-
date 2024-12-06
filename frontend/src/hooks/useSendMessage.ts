import { useState } from "react";
import useConversation from "../store/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    const sendMessage = async (data: FormData) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(`/api/message/send/${selectedConversation?.id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            setMessages([...messages, ...res.data]);
            
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

    return { loading, sendMessage };
}

export default useSendMessage;