import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import useMarkMessageAsSeen from "../../hooks/useMarkMessageAsSeen";
import { TiTickOutline } from "react-icons/ti";
import { TiTick } from "react-icons/ti";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const { markAsSeen } = useMarkMessageAsSeen();

	const fromMe = message.senderId === authUser._id;

	const formattedTime = extractTime(message.createdAt);

	const chatClassName = fromMe ? "justify-end" : "justify-start";

	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	const bubbleBgColor = fromMe ? "bg-green-500" : "bg-gray-700";

	const shakeClass = message.shouldShake ? "animate-shake" : "";

	
	useEffect(() => {
		if (!fromMe && selectedConversation?._id) {
			markAsSeen(message._id);
		}
	}, [message._id, fromMe, markAsSeen, selectedConversation?._id]);

	return (
		<div className={`flex items-end gap-2 ${chatClassName} my-2`}>
			<div className='flex items-center'>
				<img alt='User avatar' src={profilePic} className='w-10 h-10 rounded-full' />
			</div>
			<div className={`p-3 rounded-lg min-w-20 text-white ${bubbleBgColor} ${shakeClass} max-w-xs`}>
				<p>{message.message}</p>
				<div className="flex justify-between">
				{fromMe && !message.seen && (
					<TiTickOutline className="mt-1"/>
				)}
				{fromMe && message.seen && (
					<TiTick className="text-blue-700 mt-1" />
				)}
				<div className='text-xs opacity-75 mt-1 text-right'>{formattedTime}</div>
				</div>
			</div>
		</div>
	);
};

export default Message;