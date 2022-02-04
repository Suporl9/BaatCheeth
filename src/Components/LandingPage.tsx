import { useEffect } from "react";

import { WrapperDisplayMain } from "./DisplayMain";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../fireBase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChannelContents } from "./ChatSection";
import newLogo from "../assets/baatcheeth.png";
import { SideBar } from "./SideBar";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate(`/`);
  }, [user, navigate, loading]);
  return (
    <WrapperDisplayMain>
      <SideBar />
      <ChannelContentsMod>
        <ChannelContents1>
          <BaatCheethLogo1 src={newLogo} />
          <PlaceToChat>Baat-Cheeth. Your Place To Chat.</PlaceToChat>
        </ChannelContents1>
      </ChannelContentsMod>
    </WrapperDisplayMain>
  );
};

const ChannelContentsMod = styled(ChannelContents)`
  /* margin-bottom: 1rem; */
  box-shadow: 0px 0px 40px #232931;
`;
const ChannelContents1 = styled(ChannelContents)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  margin-top: -2rem;
`;
const BaatCheethLogo1 = styled.img`
  width: 15rem;
  height: 15rem;
`;
const PlaceToChat = styled.h2``;
