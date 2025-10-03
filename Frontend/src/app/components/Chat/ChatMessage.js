'use client';

const ChatMessage = ({ message, isSender }) => {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isSender
            ? 'bg-green-500 text-white rounded-l-lg rounded-tr-lg'
            : 'bg-gray-200 text-gray-800 rounded-r-lg rounded-tl-lg'
        } px-4 py-2 max-w-[70%]`}
      >
        <p className="text-sm">{message}</p>
        <span className="text-xs opacity-75 block mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;