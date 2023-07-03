import { Box, TextField, Typography, styled, Button } from "@mui/material";
import { useState } from "react";
const LogBox = styled(Box)`
  font-family: Roboto, Arial, sans-serif;
  display: flex;
  width: 610px;
  height: 528px;
  object-fit:contain;
  
`;

const LeftBox = styled(Box)`
  min-width: 150px;
  max-width: 150px;
  background-color: #2874f0;
  color: #fff;
  margin:0;
  padding: 40px 33px;
  font-size: 15px;
  p:first-child{
    font-size: 28px;
    font-weight: 500;
  }
  img {
    width: 150px;
    position: absolute;
    bottom:0;
    margin:0 0  20px 0;
  }
`;
const RightBox = styled(Box)`
   width:360px; 
   margin:0;
  padding: 56px 35px 16px;
  position: relative;
  background-color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`;

const LoginCredentialBox = styled(Box)`

`;
const InputTextField = styled(TextField)`
  width: 80%;
  font-size: 12px;
`;
const TermTypography = styled(Box)`
  padding: 30px 0px 20px 0;
  width:280px;
  color: #878787;
  font-size: 12px;
  font-weight: 400;
`;

const LoginButton = styled(Button)`
  margin: 0;
  width: 230px;
  height: 28px;
  padding: 20px 10px;
  background: #fb641b;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0;
  border: none;
  color: #fff;
  text-transform: none;
  cursor: pointer;
`;
const NwTypography = styled(Typography)`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  color: #2874f0;
  font-weight: 600;
  font-size: 12px;
  padding: 16px;
`;
const ExButton = styled(Button)`
  text-transform: none;
  border: none;
  line-height: 180%;
  text-align: center;
  color: #2874f0;
  background-color: #fff;
  margin-top: 16px;
  width: 230px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  &:hover {
    background-color: #fff;
  }
`;

const Login = (props) => {
  const url = `https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png`;

  const [showLogin, setshowLogin] = useState(true);
  const {email,setEmail,password,setPassword}=props;

  const fn = () => {
    setshowLogin(!showLogin);
    return;
  };
  return (
    <>
      <LogBox>
        <LeftBox>
          {showLogin && (
            <>
              <p>Login</p>
              <Typography>
                Get access to your Orders, Wishlist and Recommendations
              </Typography>
            </>
          )}
          {
            (!showLogin)&&<>
              <p>Looks like you're new here!</p>
              <Typography>
              Sign up with your mobile number to get started
              </Typography>

            </>
          }
          <img src={url} alt="img" />
        </LeftBox>

        <RightBox>
          <LoginCredentialBox>
            {showLogin && (
              <>

              <InputTextField
                type="text"
                placeholder="Enter Email/Mobile number"
                variant="standard"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <InputTextField 
              type="password"
              placeholder="Enter Password"
              variant="standard"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              />
              <div>
              <a href="">Forgot Password</a>
              </div>
              </>
            )}
            {!showLogin && (
              <>

              <InputTextField
                type="text"
                placeholder="Enter Email/Mobile number"
                variant="standard"
              />
              <InputTextField 
              type="password"
              placeholder="Enter Password"
              variant="standard"
              />
              </>
            )}

            <TermTypography>
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </TermTypography>
            {showLogin && (
              <>

              <LoginButton variant="contained" onClick={props.userLogin}>Log In</LoginButton>
                <div style={{width:"80%",height:"20px",textAlign:"center",paddingTop:"15px",fontWeight:"bold"}}>OR</div>
              <ExButton variant="contained">Request OTP</ExButton>  
              </>
            )}
            {!showLogin && (
              <>
                <LoginButton variant="contained"
                onClick={props.userSignUp}
                >CONTINUE</LoginButton>
                <ExButton
                  variant="contained"
                  onClick={() => setshowLogin(!showLogin)}
                >
                  Existing User?Log in
                </ExButton>
              </>
            )}
          </LoginCredentialBox>
          {showLogin && (
            <NwTypography onClick={fn}>
              New to Flipkart? Create an account
            </NwTypography>
          )}
        </RightBox>         
      </LogBox>
    </>
  );
};

export default Login;
