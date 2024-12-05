import toast from "react-hot-toast";

function handleLoginInputs(username: string, password: string): boolean {
    if (!username) {
        toast.error("You must enter username");
        return false
    }

    if (!password) {
        toast.error("You must enter password");
        return false
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false
    } 

    return true
}

export default handleLoginInputs;