import React from "react";

const ChatSkeletonModern = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat Messages Area */}
      <div className="flex flex-col flex-1 overflow-hidden p-6 space-y-6">
        {/* Date Header Skeleton */}
        <div className="flex justify-center">
          <div className="h-5 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer" />
        </div>

        {/* Message Skeletons */}
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } items-start space-x-3`}
            >
              {/* Avatar Skeleton */}
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer ${
                  index % 2 === 0 ? "order-1" : "order-2"
                }`}
              />

              {/* Message Content Skeleton */}
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "order-2" : "order-1"
                } max-w-[65%]`}
              >
                <div
                  className={`h-12 w-${
                    index % 3 === 0 ? "36" : index % 3 === 1 ? "60" : "72"
                  } bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl animate-shimmer`}
                />
                <div className="h-2.5 w-44 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mt-2 animate-shimmer" />
              </div>
            </div>
          ))}
      </div>

      {/* Chat Input Skeleton */}
      <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-4">
        <div className="flex-grow h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-shimmer" />
        <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer" />
        <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-shimmer" />
      </div>
    </div>
  );
};

export default ChatSkeletonModern;
