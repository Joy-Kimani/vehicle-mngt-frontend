import React, { useState } from "react";
import Chat from "./Chat";
import chatbotIcon from "../assets/chatBotIcon.svg"; 

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2">
          <Chat />
        </div>
      )}

      {/* Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-circle btn-primary shadow-lg"
      >
        <img src={chatbotIcon} alt="Chatbot" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatWidget;
