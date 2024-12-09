import { createContext, useContext, useState } from "react";

type MessageContextProviderProps = {
    children: React.ReactNode
};

type MessageContextType = {
    messageText: string,
    setMessageText: React.Dispatch<React.SetStateAction<string>>,
    updateMessage: boolean,
    setUpdateMessage: React.Dispatch<React.SetStateAction<boolean>>,
    messageId: string,
    setMessageId: React.Dispatch<React.SetStateAction<string>>,
}

export const MessageContext = createContext<MessageContextType>({} as MessageContextType);

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessageContext must be used within an MessageContextProvider")
    }
    return context;
}

export const MessageContextProvider = (({ children }: MessageContextProviderProps) => {
    const [messageText, setMessageText] = useState('');
    const [updateMessage, setUpdateMessage] = useState(false);
    const [messageId, setMessageId] = useState('');

    return <MessageContext.Provider value={{ messageText, setMessageText, updateMessage, setUpdateMessage, messageId, setMessageId }}>
        { children }
    </MessageContext.Provider>
})