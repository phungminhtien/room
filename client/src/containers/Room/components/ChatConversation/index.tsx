import { FC, useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";

import { ChatConversationWrapper } from "./styled";

import ChatMessage from "../ChatMessage";
import ChatMessageImage from "../ChatMessageImage";

import { RootState } from "../../../../store";

const ChatConversation: FC = () => {
  const messages = useSelector((state: RootState) => state.room.messages);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <ChatConversationWrapper ref={conversationRef}>
      {messages.map((message) => {
        return message.type === "text" || message.type === "removed" ? (
          <ChatMessage message={message} key={message.id} />
        ) : (
          <ChatMessageImage message={message} key={message.id} />
        );
      })}
    </ChatConversationWrapper>
  );
};

export default memo(ChatConversation);
