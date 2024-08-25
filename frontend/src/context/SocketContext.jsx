import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import useConversation from "../zustand/useConversation"; // Import your Zustand store
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const { updateMessageSeenStatus, setMessages } = useConversation(); // Ensure you have setMessages as well

	useEffect(() => {
		if (authUser) {
			const socket = io("thread-fy3q.onrender.com/", { //deployed url
			// const socket = io("http://localhost:5000", { //testing url
				query: {
					userId: authUser._id,
				},
			});
			console.log("Client attempting to connect to Socket.IO server...");

			setSocket(socket);

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			socket.on("message", (newMessage) => {
				
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			});

			socket.on("messageSeen", (seenMessage) => {
				console.log("Message seen:", seenMessage);
				updateMessageSeenStatus(seenMessage);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser, updateMessageSeenStatus, setMessages]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
