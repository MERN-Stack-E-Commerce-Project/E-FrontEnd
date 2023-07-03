import { Box, Dialog, styled } from "@mui/material";
import Login from "./Login";
// import CloseIcon from "@mui/icons-material/Close";

const LoginDialog = (props) => {

  
  return (
    <>
      <Dialog open={props.show} onClose={() => props.setshow(false)}>
        <Login 
        email={props.email}
        setEmail={props.setEmail}
        password={props.password}
        setPassword={props.setPassword}
        userLogin={props.userLogin}
        userSignUp={props.userSignUp}
        />
      </Dialog>
    </>
  );  
};

export default LoginDialog;
