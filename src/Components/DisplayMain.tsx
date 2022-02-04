import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../fireBase";
import styled from "styled-components";
import { Channels } from "./Channels";
import { ChatSection } from "./ChatSection";
import { SideBar } from "./SideBar";

export const DisplayMain = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, navigate, loading]);
  return (
    <>
      <WrapperDisplayMain>
        <SideBar />
        <Channels />
        <ChatSection />
      </WrapperDisplayMain>
    </>
  );
};

export const WrapperDisplayMain = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow-y: hidden;
`;
