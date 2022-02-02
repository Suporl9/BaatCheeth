import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../fireBase";
import Logo from "../assets/tempLogo.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import ServerLogo1 from "../assets/server1.png";
import ProfilePic from "../assets/aotblackguy.jpg";
import { Channels } from "./Channels";
import { ChatSection } from "./ChatSection";
// import { useSelector, useDispatch } from "react-redux";
// import { getChannelId } from "../redux/slices/channelSlice";

export const DisplayMain = () => {
  const navigate = useNavigate();
  // const channelId = useSelector(getChannelId);
  const [user, loading] = useAuthState(auth);
  const logOut = () => {
    signOut(auth);
    navigate("/");
  };
  // const displayPic = user?.photoURL;
  useEffect(() => {
    console.log(user);
    if (loading) return;
    if (!user) return navigate("/");
  });
  return (
    <>
      <WrapperDisplayMain>
        <SideBar>
          <SideBarContainer>
            <TabsContainer>
              <TabSelected>
                <BaatCheethLogo src={Logo} alt="logo" />
              </TabSelected>
              <TabSelected>
                <ServerLogo src={ServerLogo1} alt="logo" />
              </TabSelected>
              <AddServerDiv>
                <BsFillPlusCircleFill size="25" style={{ margin: "1rem 0" }} />
              </AddServerDiv>
            </TabsContainer>
            <ProfileLogo src={ProfilePic} onClick={logOut} alt="dwa" />
          </SideBarContainer>
        </SideBar>
        <Channels />
        <ChatSection />
      </WrapperDisplayMain>
    </>
  );
};

const WrapperDisplayMain = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-y: hidden;
`;
const SideBar = styled.div`
  padding: 0.5%;
  font-weight: bold;
  background-color: #2b2b2b;
`;
const TabsContainer = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TabSelected = styled.div`
  background-color: #373738;
  cursor: pointer;
  padding: 4% 2%;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AddServerDiv = styled.div`
  background-color: #373738;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 8px);
`;
const BaatCheethLogo = styled.img`
  width: 3.2rem;
  height: 3rem;
`;
const ServerLogo = styled.img`
  width: 3.2rem;
  height: 3rem;
  border-radius: 50%;
`;
const ProfileLogo = styled(ServerLogo)`
  margin-bottom: 1rem;
`;

export const HorizontalLine = styled.div`
  border-bottom: 0.1px solid gray;
  box-shadow: 0 1px 5px rgba(182, 182, 182, 0.75);
`;
