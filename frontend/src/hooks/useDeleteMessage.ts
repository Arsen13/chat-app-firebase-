import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
    
const deleteMessage = async (messageId: string) => {
    try {
        await axiosInstance.delete(`/api/message/${messageId}`);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.error);
        } else {
            console.log(error);
        }
    }
}
export default deleteMessage;