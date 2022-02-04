import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/baatcheeth.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiLogoutCircleFill } from "react-icons/ri";
import ServerLogo1 from "../assets/server1.png";
import ProfilePic from "../assets/newprofileimg.png";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../fireBase";

export const SideBar = () => {
  const navigate = useNavigate();
  const [newChannelId, setNewChannelId] = useState<string | null>("");

  const [user] = useAuthState(auth);
  const logOut = () => {
    signOut(auth);
    navigate("/");
  };
  useEffect(() => {
    setNewChannelId(localStorage.getItem("id"));
  }, [navigate, newChannelId]);
  return (
    <SideBar1>
      <SideBarContainer>
        <TabsContainer>
          <TabSelected>
            <BaatCheethLogo
              src={Logo}
              alt="logo"
              onClick={() => navigate("/home")}
            />
          </TabSelected>
          <TabSelected>
            <ServerLogo
              src={ServerLogo1}
              alt="logo"
              onClick={() => navigate(`/channel/${newChannelId}`)}
            />
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
    </SideBar1>
  );
};

export const SideBar1 = styled.div`
  padding: 0.5%;
  font-weight: bold;
  background-color: #2b2b2b;
  width: 4rem;
`;
export const TabsContainer = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ProfileLogoAndLogOut = styled(TabsContainer)``;

export const TabSelected = styled.div`
  background-color: #373738;
  cursor: pointer;
  padding: 4% 2%;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const AddServerDiv = styled.div`
  background-color: #373738;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LogoutIcon = styled(AddServerDiv)`
  margin-bottom: 1.5rem;
  padding: 15px 0;
`;
export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 8px);
`;
export const BaatCheethLogo = styled.img`
  width: 3.3rem;
  height: 3.1rem;
  display: flex;
  margin: 0 1rem 0.4rem 0;
  /* justify-content: center; */
  /* align-self: center; */
`;
export const ServerLogo = styled.img`
  width: 3.2rem;
  height: 3rem;
  border-radius: 50%;
`;

export const ProfileLogo = styled.img`
  margin-bottom: 1rem;
  width: 3.2rem;
  height: 3rem;
  border-radius: 50%;
`;

export const HorizontalLine = styled.div`
  border-bottom: 0.1px solid gray;
  box-shadow: 0 1px 5px rgba(182, 182, 182, 0.75);
`;
