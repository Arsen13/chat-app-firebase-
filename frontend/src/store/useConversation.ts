import { create } from 'zustand';

type ConversationType = {
    id: string,
    fullName: string,
    profilePic: string,
    gender: string,
    username: string
} | null;

type MessagesType = {
    senderId: string,
    receiverId: string,
    message?: string,
    link?: string,
    id: string
}[];

interface ConversationState {
    selectedConversation: ConversationType | null,
    setSelectedConversation: (selectedConversation: ConversationType) => void,
    messages: MessagesType | [],
    setMessages: (messages: MessagesType) => void,
};

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;