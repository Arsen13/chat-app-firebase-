import { createContext, useContext, useState } from "react";

type AuthContextProviderProps = {
    children: React.ReactNode
};

type UserInfo = {
    id: string,
    fullName: string,
    username: string,
    profilePic: string
} | null;

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
    const userInfo = localStorage.getItem('user-info');
    const [authUser, setAuthUser] = useState<UserInfo>(() => {
        try {
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (e) {
            return null;
        }
    });

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        { children }
    </AuthContext.Provider>
}