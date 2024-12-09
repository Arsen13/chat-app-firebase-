import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { Socket } from 'socket.io-client';

type SocketContextProviderProps = {
    children: React.ReactNode
};

export interface ChatSocketCtxState {
    socket: Socket | null,
    onlineUsers: string[]
}

const SocketContext = createContext<ChatSocketCtxState>({} as ChatSocketCtxState);

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = (({ children }: SocketContextProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:5000', {
                query: {
                    userId: authUser.id,
                }
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users: string[]) => {
                setOnlineUsers(users);
            })

            return () => {
                socket.close();
                setSocket(null);
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
})