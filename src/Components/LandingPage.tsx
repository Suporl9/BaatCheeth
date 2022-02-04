import { useEffect, useState } from "react";

import {
  AddServerDiv,
  BaatCheethLogo,
  LogoutIcon,
  ProfileLogo,
  ProfileLogoAndLogOut,
  ServerLogo,
  SideBar,
  SideBarContainer,
  TabsContainer,
  TabSelected,
  WrapperDisplayMain,
} from "./DisplayMain";
import Logo from "../assets/baatcheeth.png";
import ServerLogo1 from "../assets/server1.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiLogoutCircleFill } from "react-icons/ri";
import ProfilePic from "../assets/newprofileimg.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../fireBase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import { ChannelContents } from "./ChatSection";
import newLogo from "../assets/baatcheeth.png";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [newChannelId, setNewChannelId] = useState<string | null>("");

  const logOut = () => {
    signOut(auth);
    navigate("/");
  };
  useEffect(() => {
    setNewChannelId(localStorage.getItem("id"));
    if (loading) return;
    if (!user) return navigate(`/`);
  }, [user, navigate, loading, newChannelId]);
  return (
    <WrapperDisplayMain>
      <SideBar>
        <SideBarContainer>
          <TabsContainer>
            <TabSelected>
              <BaatCheethLogo src={Logo} alt="logo" />
            </TabSelected>
            <TabSelected onClick={() => navigate(`/channel/${newChannelId}`)}>
              <ServerLogo src={ServerLogo1} alt="logo" />
            </TabSelected>
            <AddServerDiv>
              <BsFillPlusCircleFill size="25" style={{ margin: "1rem 0" }} />
            </AddServerDiv>
          </TabsContainer>
          <ProfileLogoAndLogOut>
            <LogoutIcon onClick={logOut}>
              <RiLogoutCircleFill size="30" fill="#c07cff" />
            </LogoutIcon>
            <ProfileLogo src={user ? user?.photoURL! : ProfilePic} alt="user" />
          </ProfileLogoAndLogOut>
          {/* exclamation mark is no null assertion mark */}
        </SideBarContainer>
      </SideBar>
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
const PlaceToChat = styled.h2`
  /* margin-bottom: 5rem; */
`;
