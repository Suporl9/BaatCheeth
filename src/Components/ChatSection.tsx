import React, { useRef } from "react";
import styled from "styled-components";
import { BsCircleFill } from "react-icons/bs";
import { HorizontalLine } from "./DisplayMain";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { getChannelId, getChannelName } from "../redux/slices/channelSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addDoc, collection, orderBy, query } from "firebase/firestore";
import { auth, db } from "../fireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Messages } from "./Messages";
export const ChatSection = () => {
  const channelId = useSelector(getChannelId);
  const channelName = useSelector(getChannelName);

  const [newChannelId, setNewChannelId] = useState(channelId);
  const [newChannelName, setNewChannelName] = useState(channelName);
  const [message, setMessage] = useState<string>("");
  const chatRef = useRef<any>(null);
  const [user] = useAuthState(auth);
  const inputRef = useRef<any>(""); //? fix everything
  const q = query(
    collection(db, `channels/${channelId ? channelId : newChannelId}/messages`),
    orderBy("timestamp", "asc")
  );
  const [messages] = useCollection(
    (channelId || newChannelId) && q

    // db.collection()
  );

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const addMessageToChannel = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (inputRef.current.value !== "") {
        await addDoc(
          collection(
            db,
            `channels/${channelId ? channelId : newChannelId}/messages`
          ),
          {
            message: message,
            userName: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
            timestamp: serverTimestamp(),
          }
        );
        inputRef.current.value = "";
        scrollToBottom();
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!channelId) {
      setNewChannelId(localStorage.getItem("id"));
      setNewChannelName(localStorage.getItem("channelName"));
    }
  }, [channelId]);
  return (
    <ChannelContents>
      <ChannelNameAndOnline>
        <ChannelNameOnTop>{`# ${
          channelName ? channelName : newChannelName
        }`}</ChannelNameOnTop>
        <PeopleOnline>
          <BsCircleFill size="15" fill="#5fe929" />
          <OnlineIndicator>1 Online</OnlineIndicator>
        </PeopleOnline>
      </ChannelNameAndOnline>
      <HorizontalLine />
      <ChatContainer>
        <ChatIndexContainer>
          {messages?.docs.map((doc) => {
            const { userName, message, email, photoURL, timestamp } =
              doc.data();
            return (
              <Messages
                userName={userName}
                id={doc.id}
                message={message}
                email={email}
                photoURL={photoURL}
                timeStamp={timestamp}
                key={doc.id}
                chatRef={chatRef}
              />
            );
          })}
        </ChatIndexContainer>

        <SendMessage onSubmit={addMessageToChannel}>
          <BsFillPlusCircleFill
            fill="#fd4c4c"
            size="20"
            style={{ marginLeft: "10px", cursor: "pointer" }}
          />
          <SendMessageInput
            placeholder={
              newChannelId
                ? `message ${channelName ? channelName : newChannelName}`
                : `Click on channel to chat messaging`
            }
            ref={inputRef}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
          ></SendMessageInput>
          <SendBtn type="submit">
            <IoMdSend size="25" fill="#fd4c4c" />
          </SendBtn>
        </SendMessage>
      </ChatContainer>
    </ChannelContents>
  );
};

//channel content section

export const ChannelContents = styled.div`
  background-color: #2b2b2b;
  width: 100%;
`;
const ChannelNameAndOnline = styled.div`
  padding: 1.36rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ChannelNameOnTop = styled.div`
  text-transform: capitalize;
`;
const PeopleOnline = styled.div`
  /* text-transform: capitalize; */
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1rem;
`;

const OnlineIndicator = styled.div`
  margin-left: 10px;
`;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  justify-content: space-between;
  /* scroll-behavior: smooth; */
`;
const ChatIndexContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  /* scrollbar-color: black; */
  flex-direction: column;
  margin-top: 2rem;
  margin-right: 1rem;
  &::-webkit-scrollbar {
    width: 9px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a4d52;
    border: 2px solid #282a2d;
    border-radius: 10px;
  }
`;

const SendMessage = styled.form`
  background-color: #403f3e;
  margin: 1.5rem 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  min-height: 4rem;
`;
const SendMessageInput = styled.input`
  border-style: none;
  margin-left: 15px;
  background-color: #403f3e;
  outline: none;
  height: 100%;
  width: 90%;
`;
const SendBtn = styled.button`
  background-color: #403f3e;
  border: none;
  cursor: pointer;
`;
