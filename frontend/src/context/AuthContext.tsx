import { createContext, useContext, useState } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode
};

type UserInfo = string | null;

type AuthContextType = {
    authUser: UserInfo,
    setAuthUser: React.Dispatch<React.SetStateAction<UserInfo>>
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider")
    }
    return context;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [authUser, setAuthUser] = useState<UserInfo>(localStorage.getItem('user-info'));

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        { children }
    </AuthContext.Provider>
}