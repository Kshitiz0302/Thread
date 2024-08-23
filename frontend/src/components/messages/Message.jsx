import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();

	// Determine if the message was sent by the current user
	const fromMe = message.senderId === authUser._id;

	// Format the time the message was created
	const formattedTime = extractTime(message.createdAt);

	// Set the alignment of the message based on the sender
	const chatClassName = fromMe ? "justify-end" : "justify-start";

	// Set the profile picture based on the sender
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

	// Set the background color of the chat bubble
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";

	// Apply a shake animation if necessary
	const shakeClass = message.shouldShake ? "animate-shake" : "";

	return (
		<div className={`flex items-end gap-2 ${chatClassName} my-2`}>
			<div className='flex items-center'>
				<img alt='User avatar' src={profilePic} className='w-10 h-10 rounded-full' />
			</div>
			<div className={`p-3 rounded-lg text-white ${bubbleBgColor} ${shakeClass} max-w-xs`}>
				<p>{message.message}</p>
				<div className='text-xs opacity-75 mt-1 text-right'>{formattedTime}</div>
			</div>
		</div>
	);
};

export default Message;
