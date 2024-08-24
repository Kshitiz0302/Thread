import { useCallback } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext"; 
import toast from "react-hot-toast";

const useMarkMessageAsSeen = () => {
	const { selectedConversation } = useConversation();
	const { socket } = useSocketContext(); 
	const markAsSeen = useCallback(async (messageId) => {
		if (!selectedConversation?._id) return;

		try {
			if (socket) {
				socket.emit("messageSeen", { messageId, userId: socket.id });
			}

			const res = await fetch(`/api/messages/mark-seen`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ messageId }),
			});

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			// toast.success("Message marked as seen!");
		} catch (error) {
			toast.error(error.message);
		}
	}, [selectedConversation?._id, socket]);

	return { markAsSeen };
};

export default useMarkMessageAsSeen;
