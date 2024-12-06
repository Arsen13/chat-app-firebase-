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

export type ConversationsType = {
    fullName: string,
    username: string,
    gender: string,
    profilePic: string,
    id: string
}[];

interface ConversationState {
    selectedConversation: ConversationType | null,
    setSelectedConversation: (selectedConversation: ConversationType) => void,
    messages: MessagesType | [],
    setMessages: (messages: MessagesType) => void,
    conversations: ConversationsType | [],
    setConversations: (conversations: ConversationsType | []) => void
};

const useConversation = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    conversations: [],
    setConversations: (conversations) => set({ conversations })
}));

export default useConversation;