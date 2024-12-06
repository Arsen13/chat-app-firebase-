import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function useGetMessages() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get(`/api/message/${selectedConversation?.id}`);
                setMessages(res.data);
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

        if (selectedConversation?.id) getMessages();
    }, [selectedConversation?.id, setMessages])

    return { loading, messages }
};

export default useGetMessages;