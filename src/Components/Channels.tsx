import styled from "styled-components";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { HorizontalLine } from "./DisplayMain";
import { db } from "../fireBase";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../redux/slices/channelSlice";

export const Channels = () => {
  // const [user, loading] = useAuthState(auth);
  // const [channels, setChannels] = useState([] as any); // ? fix this later please
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [channels] = useCollection(collection(db, "channels"));

  const handleAddChannel = async () => {
    const addChannel = prompt("Enter new channel Name");
    try {
      if (addChannel) {
        await addDoc(collection(db, "channels"), {
          channelName: addChannel,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setChannel = (id: string, channelName: string) => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    localStorage.setItem("id", id);
    localStorage.setItem("channelName", channelName);

    navigate(`/channel/${id}`);
  };

  return (
    <ChannelContainer>
      <ServerNameOnTop>Adventure Channel</ServerNameOnTop>
      <HorizontalLine />
      <ChannelAndChannelListContainer>
        <Channel>
          <ChannelName>Channels</ChannelName>
          <BsFillPlusCircleFill
            fill="#fd4c4c"
            size="20"
            onClick={handleAddChannel}
          />
        </Channel>
        <ChannelList>
          {channels?.docs.map((chann) => {
            const { channelName } = chann.data();
            return (
              <ChannelListName
                key={chann.id}
                onClick={() => setChannel(chann.id, channelName)}
              >
                {channelName}
              </ChannelListName>
            );
          })}
        </ChannelList>
      </ChannelAndChannelListContainer>
    </ChannelContainer>
  );
};
//channel section
const ChannelContainer = styled.div`
  width: 22rem;
  background-color: #181818;
  display: flex;
  flex-direction: column;
`;
const ServerNameOnTop = styled.div`
  padding: 8%;
`;
const ChannelAndChannelListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8% 0% 8% 8%;
  padding-right: 0.9rem;
  overflow-y: auto;
  overflow-x: hidden;
  /* &::-webkit-scrollbar {
    border: 1px solid black;
    background-color: #2b2b2b;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: #2b2b2b;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2b2b2b;
  } */
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
const Channel = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10% 0 10% 5%;
  justify-content: space-between;
`;
const ChannelName = styled.div``;
const ChannelList = styled.div`
  display: flex;
  flex-direction: column;
`;
const ChannelListName = styled.div`
  background-color: #2b2b2b;
  margin-bottom: 5%;
  padding: 7% 5%;
  cursor: pointer;
`;
