import styled from "styled-components";
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
  // email,
  photoURL,
  // timeStamp,
  chatRef,
  id,
}: PropsTypes) => {
  return (
    <ChatIndex key={id} ref={chatRef}>
      <ProfilePicAndContent>
        <ProfileLogoChatIndex src={photoURL} alt="profileId" />
        <ChatContents>
          <UserName>{userName}</UserName>
          <UserMessage>{message}</UserMessage>
        </ChatContents>
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
`;
const ProfileLogoChatIndex = styled.img`
  width: 3.2rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 2%;
`;
const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
`;
const UserName = styled.div`
  color: #fd4c4c;
  font-size: 18px;
`;
const UserMessage = styled.span`
  margin: 1rem 0.9rem;
`;
