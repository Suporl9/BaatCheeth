import { signInWithPopup } from "firebase/auth";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/background.jpg";
import { auth, db, provider } from "../fireBase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../redux/slices/channelSlice";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
export const Login = () => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [getChannelInitial] = useCollectionOnce(collection(db, "channels"));
  const signInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, provider);
      dispatch(
        setChannelInfo({
          channelId: getChannelInitial?.docs[0].id,
          channelName: getChannelInitial?.docs[0].data().channelName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  // const checkIncomingData = () => {
  //   console.log(getChannelInitial?.docs[0].data());
  // };

  // const loginWithEmailAndPassword = (e) => {
  //   e.preventDefault();
  // };

  useEffect(() => {
    if (loading) return;

    if (user) {
      navigate(`/channel/${getChannelInitial?.docs[0].id}`);
    }
  }, [loading, user, navigate, getChannelInitial?.docs]);
  return (
    <Wrapper>
      <LoginFormContainer>
        {/* <LoginWithEmailAndPassword onSubmit={loginWithEmailAndPassword}>
          <LoginH2 onClick={checkIncomingData}>LOGIN</LoginH2>
          <EmailLabel>Email</EmailLabel>
          <EmailInput />
          <PasswordLabel>Password</PasswordLabel>

          <PasswordInput />
          <AccountRegister>
            <SpanAccount>Don't have an accout?</SpanAccount>
            <Link to={"/signup"}>GO here</Link>
          </AccountRegister>
          <LoginBtn type="submit">LOGIN</LoginBtn>
        </LoginWithEmailAndPassword>
        <SpanOr>Or</SpanOr> */}
        <SignInWithGoogleBtn onClick={signInWithGoogle}>
          Log In with Google
        </SignInWithGoogleBtn>
      </LoginFormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
`;
const LoginFormContainer = styled.div`
  background-color: #2b2b2b;
  /* width: ; */
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  padding: 2%;
`;
// const LoginWithEmailAndPassword = styled.form`
//   background-color: #2b2b2b;
//   display: flex;
//   flex-direction: column;
// `;
// const LoginH2 = styled.h2``;
// const LoginBtn = styled.button`
//   background-color: #8338ec;
//   border: none;
//   padding: 15px 50px;
//   font-weight: bold;
//   cursor: pointer;
// `;
// const EmailLabel = styled.label``;
// const EmailInput = styled.input``;
// const PasswordLabel = styled.label``;
// const PasswordInput = styled.input``;
// const AccountRegister = styled.span`
//   display: flex;
//   flex-direction: row;
// `;
// const SpanAccount = styled.span``;
// const SpanOr = styled.span`
//   margin: 5% 0;
//   align-self: center;
// `;
const SignInWithGoogleBtn = styled.button`
  background-color: #8338ec;
  border: none;
  padding: 15px 50px;
  font-weight: bold;
  cursor: pointer;
`;
