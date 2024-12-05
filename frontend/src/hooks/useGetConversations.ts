import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function useGetConversations() {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get('/api/user');
                const data = await res.data;
                setConversations(data);
            } catch (error){
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.error);
                } else {
                    console.log(error);
                }
            } finally {
                setLoading(false);
            }
        }

        getConversations();
    }, [])

    return { loading, conversations }
}

export default useGetConversations;