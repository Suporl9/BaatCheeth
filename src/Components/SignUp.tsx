import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/background.jpg";
export const SignUp = () => {
  const signInWithGoogle = (e) => {
    e.preventDefault();
  };

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault();
  };
  return (
    <Wrapper>
      <LoginFormContainer>
        <LoginWithEmailAndPassword onSubmit={loginWithEmailAndPassword}>
          <LoginH2>SIGNUP</LoginH2>
          <EmailLabel>User Name</EmailLabel>
          <EmailInput />
          <EmailLabel>Email</EmailLabel>
          <EmailInput />
          <PasswordLabel>Password</PasswordLabel>

          <PasswordInput />
          <AccountRegister>
            <SpanAccount>Don't have an accout?</SpanAccount>
            <Link to={"/"}>GO here</Link>
          </AccountRegister>
          <LoginBtn type="submit">Sign Up</LoginBtn>
        </LoginWithEmailAndPassword>
        <SpanOr>Or</SpanOr>
        <SignInWithGoogleBtn onClick={signInWithGoogle}>
          Sign Up with Google
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
const LoginWithEmailAndPassword = styled.form`
  background-color: #2b2b2b;
  display: flex;
  flex-direction: column;
`;
const LoginH2 = styled.h2``;
const LoginBtn = styled.button`
  background-color: #8338ec;
  border: none;
  padding: 15px 50px;
  font-weight: bold;
  cursor: pointer;
`;
const EmailLabel = styled.label``;
const EmailInput = styled.input``;
const PasswordLabel = styled.label``;
const PasswordInput = styled.input``;
const AccountRegister = styled.span`
  display: flex;
  flex-direction: row;
`;
const SpanAccount = styled.span``;
const SpanOr = styled.span`
  margin: 5% 0;
  align-self: center;
`;
const SignInWithGoogleBtn = styled.button`
  background-color: #8338ec;
  border: none;
  padding: 15px 50px;
  font-weight: bold;
  cursor: pointer;
`;
