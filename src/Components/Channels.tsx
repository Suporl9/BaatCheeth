import styled from "styled-components";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { db } from "../fireBase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../redux/slices/channelSlice";
import { useState } from "react";
import { PopUpAddChannel } from "./PopUpAddChannel";
import { HorizontalLine } from "./SideBar";

type PassingProps = {
  selected?: boolean;
};
export const Channels = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const q = query(collection(db, "channels"), orderBy("timestamp", "asc"));
  const [channels] = useCollection(q);
  const [isOpen, setIsOpen] = useState<boolean>();
  // const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleAddChannel = () => {
    setIsOpen(!isOpen);
  };

  const setChannel = (id: string, channelName: string) => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    // setIsSelected(true);

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
            style={{
              cursor: "pointer",
            }}
          />
        </Channel>
        <ChannelList>
          {channels?.docs.map((chann) => {
            const { channelName } = chann.data();
            return (
              <ChannelListName
                key={chann.id}
                onClick={() => setChannel(chann.id, channelName)}
                // selected={isSelected}
              >
                {channelName}
              </ChannelListName>
            );
          })}
        </ChannelList>
      </ChannelAndChannelListContainer>
      {isOpen && <PopUpAddChannel handleClose={handleAddChannel} />}
    </ChannelContainer>
  );
};
//channel section
const ChannelContainer = styled.div`
  max-width: 17rem;
  min-width: 17rem;
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
const ChannelListName = styled.div<PassingProps>`
  :hover {
    background-color: #2b2b2b;
  }
  text-transform: capitalize;
  margin-bottom: 5%;
  padding: 7% 5%;
  cursor: pointer;
  /* background-color: ${(props) => (props.selected ? "#2b2b2b" : "white")}; */
`;
