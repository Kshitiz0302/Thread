import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

	messages: [],
	setMessages: (messages) => set({ messages }),

	updateMessageSeenStatus: (seenMessage) => set((state) => ({
		messages: state.messages.map((msg) =>
			msg._id === seenMessage.messageId ? { ...msg, seen: true } : msg
		),
	})),
}));

export default useConversation;
