import { useEffect, useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";
import Messages from "../../components/messages/Messages";
import MessageInput from "../../components/messages/MessageInput";
import { TiArrowBack } from "react-icons/ti";


const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBackButtonClick = () => {
    // Reset the selected conversation to show the sidebar again
    setSelectedConversation(null);
  };

  return (
    <>
      {!isMobile && (
        <div className='flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <Sidebar isMobile={isMobile} className='flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/5' />
          <MessageContainer isMobile={isMobile} className='flex-1' />
        </div>
      )}
      {isMobile && !selectedConversation && (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <Sidebar isMobile={isMobile} />
        </div>
      )}
      {isMobile && selectedConversation && (
        <div className='w-screen flex flex-col'>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-between'>
            <div className='mt-1'>
              <span className='label-text'>To:</span>{" "}
              <span className='text-white font-bold'>{selectedConversation.fullName}</span>
            </div>

            <div className="mt-1">
              <button onClick={handleBackButtonClick} className='text-white'>
			  <TiArrowBack size={22}/>
              </button>
            </div>
          </div>

          <Messages isMobile={isMobile} />
          <MessageInput />
        </div>
      )}
    </>
  );
};

export default Home;
