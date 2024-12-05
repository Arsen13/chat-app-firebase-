import toast from "react-hot-toast"

type handleInputErrorsParams = {
    fullName: string,
    username: string,
    password: string,
    confirmPassword: string,
    gender: string
}

function handleInputErrors({fullName, username, password, confirmPassword, gender}: handleInputErrorsParams): boolean {
    if (!fullName) {
        toast.error("Enter full name please");
        return false
    }

    if (!username) {
        toast.error("Enter username please");
        return false
    }

    if (!password) {
        toast.error("Enter password please");
        return false
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false
    }

    if (!confirmPassword) {
        toast.error("Enter confirm password please");
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords don't match");
        return false
    }

    if (!gender) {
        toast.error("Choose your gender please");
        return false
    }

    return true
}

export default handleInputErrors;