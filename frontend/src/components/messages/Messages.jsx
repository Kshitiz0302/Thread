import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = ({ isMobile = false }) => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div
			className={`px-4 overflow-auto ${isMobile ? 'w-full h-full' : 'flex-1'} ${isMobile ? 'h-full' : ''}`}
			style={{ 
				maxHeight: isMobile ? 'calc(100vh - 200px)' : 'auto', 
				overflowY: 'auto',
				width: isMobile ? '100%' : 'auto' 
			}}
		>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<div className={`flex flex-col justify-start p-4 h-96`}>
				<p className='text-center text-white mb-4'>Send a message to start the conversation</p>
				
			  </div>
			  
			)}
		</div>
	);
};

export default Messages;
