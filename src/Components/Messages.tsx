import styled from "styled-components";
import moment from "moment";
import { HiTrash } from "react-icons/hi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../fireBase";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { getChannelId } from "../redux/slices/channelSlice";
import { useEffect, useState } from "react";

type PropsTypes = {
  userName: string;
  message: string;
  email: string;
  photoURL: string;
  timeStamp: any;
  id: string;
  chatRef: any;
};
export const Messages = ({
  userName,
  message,
  email,
  photoURL,
  timeStamp,
  chatRef,
  id,
}: PropsTypes) => {
  const [user] = useAuthState(auth);
  const channelId = useSelector(getChannelId);
  const [newChannelId, setNewChannelId] = useState(channelId);
  const deleteMessage = async () => {
    try {
      await deleteDoc(
        doc(
          db,
          `channels/${channelId ? channelId : newChannelId}/messages/${id}`
        )
      );
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (!channelId) {
      setNewChannelId(localStorage.getItem("id"));
    }
  }, [channelId]);
  return (
    <ChatIndex key={id} ref={chatRef}>
      <ProfilePicAndContent>
        <ChatContents>
          <ProfileLogoChatIndex src={photoURL} alt="profileId" />
          <UserNameAndMessage>
            <UserName>{userName}</UserName>
            <UserMessage>{message}</UserMessage>
          </UserNameAndMessage>
        </ChatContents>
        <TimeStampAndTrash>
          <TimeStamp>
            {moment(timeStamp?.toDate().getTime()).format("lll")}
          </TimeStamp>
          {user?.email === email && (
            <TrashDiv onClick={deleteMessage}>
              <HiTrash size={20} />
            </TrashDiv>
          )}
        </TimeStampAndTrash>
      </ProfilePicAndContent>
    </ChatIndex>
  );
};

const ChatIndex = styled.div`
  background-color: #1b1b1b;
  margin: 0 1rem 1rem 1rem;
  border-radius: 5px;
  padding: 1% 4% 1% 2%;
`;
const ProfilePicAndContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1rem;
  }
`;
const ProfileLogoChatIndex = styled.img`
  width: 3.2rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 2%;
`;
const ChatContents = styled.div`
  display: flex;
  flex-direction: row;
`;
const UserNameAndMessage = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0.9rem;
  min-width: 9rem;
`;
const UserName = styled.div`
  color: #fd4c4c;
  font-size: 16px;
`;
const TimeStamp = styled.div`
  color: #c07cff;
  font-size: 13px;
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;
const UserMessage = styled.span`
  margin: 1rem 0.9rem;
  font-size: 15px;
  max-width: 50rem;
`;
const TimeStampAndTrash = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
  }
`;
const TrashDiv = styled.div`
  align-self: flex-end;
  background-color: #fd4c4c;
  border: 5px;
  padding: 2%;
  margin-bottom: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem 0 0 0;
  }
`;
