import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../fireBase";
import backgroundImage from "../assets/background.jpg";
type PropsTypes = {
  handleClose: () => void;
};

export const PopUpAddChannel = ({ handleClose }: PropsTypes) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [channelNameValue, setChannelNameValue] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const ChannelSubmitHandler = async () => {
    try {
      if (channelNameValue !== "") {
        await addDoc(collection(db, "channels"), {
          channelName: channelNameValue,
          timestamp: serverTimestamp(),
        });
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <PopupBox>
        <Box>
          <CloseIcon onClick={handleClose}>x</CloseIcon>
          <ChannelName>Channel Name:</ChannelName>
          <InputArea
            value={channelNameValue}
            ref={inputRef}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setChannelNameValue(e.target.value)
            }
          />

          <CardBtn onClick={ChannelSubmitHandler}>Create</CardBtn>
        </Box>
      </PopupBox>
    </>
  );
};

const PopupBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 16;
`;
const Box = styled.div`
  position: relative;
  width: 20rem;
  margin: 0 auto;
  min-height: 14rem;
  background-image: url(${backgroundImage});
  background-size: cover;
  margin-top: calc(100vh - 80vh);
  border-radius: 4px;
  padding: 20px;
  border: none;
  overflow: auto;
`;
const CloseIcon = styled.div`
  content: "x";
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;

  background: #fd4c4c;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: none;
  font-size: 20px;
`;
const ChannelName = styled.h3`
  color: black;
  text-shadow: 0.2px 0.2px white;
  font-weight: bold;
`;
const InputArea = styled.input`
  margin-top: 0.5rem;
  width: 100%;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 10px;
  font-weight: bold;
  font-size: 1em;
  color: black;
  text-align: center;
`;

const CardBtn = styled.button`
  padding: 10px;
  background-color: #7b4cfd;
  text-transform: uppercase;
  font-weight: 900;
  width: 100%;
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  outline: none;
  margin-top: 5%;
`;
