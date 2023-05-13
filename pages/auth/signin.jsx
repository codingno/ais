import { getCsrfToken, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// material
import { signIn } from "next-auth/react";
import { styled } from "@mui/material/styles";
import {
  Card,
  Stack,
  Link,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
// layouts
// import AuthLayout from '../layouts/AuthLayout';
// components
// import Page from '../components/Page';
// import { MHidden } from '../components/@material-extend';
// import LoginForm from '../components/authentication/login/LoginFormLms';
// import AuthSocial from '../components/authentication/AuthSocial';
// import { mockImgCover } from '../utils/mockImages';
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import CancelIcon from "@mui/icons-material/Cancel";
// material
import {
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

import coverLogin from "./cover-login.jpg";
// import { useSelector, useDispatch } from "react-redux";
// import './css/login.css'

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex'
//   },
//   backgroundRepeat: 'no-repeat',
//   backgroundSize: 'cover',
//   minHeight: '100vh',
//   width: '100%',
// }));

// const SectionStyle = styled(Card)(({ theme }) => ({
//   width: '100%',
//   maxWidth: 464,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   margin: theme.spacing(2, 0, 2, 2)
// }));

// const ContentStyle = styled('div')(({ theme }) => ({
//   // maxWidth: 480,
//   maxWidth: '100%',
//   margin: 'auto',
//   display: 'flex',
//   minHeight: '100vh',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   padding: theme.spacing(12, 0)
// }));

// const FormStyle = styled('div')(({ theme }) => ({
//   // maxWidth: 464,
//   maxWidth: '100%',
//   display: 'flex',
//   flexDirection: 'rows',
//   justifyContent: 'space-around',
//   padding: theme.spacing(5, 5),
//   borderRadius: '16px',
//   // backgroundColor: 'white'
// }));

export default function SignIn({ csrfToken }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const rootRef = useRef(null);

  // const dispatch = useDispatch();
  // const { user } = useSelector(state => state)
  // const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(0);
  const [popUpForgotPassword, setPopUpForgotPassword] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorReset, setErrorReset] = useState("");
  const [disableReset, setDisableReset] = useState(false);
  const [userInfo, setuserInfo] = useState({});
  const forgotPassword = (bool) => setPopUpForgotPassword(bool);

  useEffect(() => {
    if (router.query.error) setOpenModal(true);
  }, []);

  const signInOld = async (e) => {
    e.preventDefault();
    // const data = JSON.stringify({email, password})
    try {
      // const rawResponse = await fetch('/api/login', {
      // 														method: 'POST',
      // 														headers: {
      // 															'Accept': 'application/json',
      // 															'Content-Type': 'application/json'
      // 														},
      // 														mode: 'cors',
      // 														body: data
      // 													})
      // const responseData= await rawResponse.json()
      // if(responseData.message)
      //  alert(responseData.message)
      // else {
      // 	setuserInfo(responseData)
      // 	navigate('/')
      // }
      // const getUserInfo = await axios.post('/api/login', {email, password})
      const getUserInfo = await axios.post("/api/auth/callback/credentials", {
        name: email,
        password,
      });
      localStorage.setItem("getUserInfo", JSON.stringify(getUserInfo.data));
      dispatch({ type: "getUserInfo", data: getUserInfo.data });
      // navigate('/')
    } catch (err) {
      if (err.response) {
        dispatch({ type: "err_getUserInfo", error: err.response.data.message });
        alert(err.response.data.message);
      }
    }
  };
  const sendForgotPassword = async (e) => {
    e.preventDefault();
    setDisableReset(true);
    try {
      const resetPass = await axios.post("/api/reset-password-token", {
        email,
      });
      // e.preventDefault()
      alert("send forgot password");
      // navigate('/')
      setDisableReset(false);
    } catch (error) {
      setErrorReset(error.response.data.err);
      setDisableReset(false);
    }
  };

  async function onSignIn(e) {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        username: email,
        password,
      });
      console.log(
        `🚀 ~ file: signin.jsx ~ line 146 ~ onSignIn ~ response`,
        response
      );
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else alert(error);
    }
  }

  if (status === "authenticated") {
    router.push("/");
  }
  if (status === "loading" || status === "authenticated") return "";

  return (
    // <form method="post" action="/api/auth/callback/credentials">
    //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //   <label>
    //     Username
    //     <input name="username" type="text" />
    //   </label>
    //   <label>
    //     Password
    //     <input name="password" type="password" />
    //   </label>
    //   <button type="submit">Sign in</button>
    // </form>
    // <RootStyle title="Login | AIS">
    <>
      {/* <AuthLayout> */}
      {/* <Typography sx={{ color: 'white' }}>Don’t have an account? &nbsp;</Typography>
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
          sx={{ color: '#E3A130' }}
        >
          Get started
        </Link> */}
      {/* </AuthLayout> */}
      {/* <div className="container-login"> */}
      <div className="container-login" style={{
        backgroundImage : `url(${coverLogin.src})`
      }}>
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open={openModal}
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          sx={{
            display: "flex",
            p: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          container={() => rootRef.current}
        >
          <Card
            sx={{
              position: "relative",
              width: 400,
              // bgcolor: 'background.paper',
              bgcolor: "#00778B",
              // border: '2px solid #F00',
              boxShadow: (theme) => theme.shadows[5],
              px: 4,
              py: 7,
              textAlign: "center",
            }}
          >
            <IconButton
              onClick={() => setOpenModal(false)}
              edge="end"
              sx={{
                position: "absolute",
                padding: "0.35rem",
                width: 30,
                height: 30,
                right: "13px",
                top: "2px",
                color: "white",
              }}
            >
              {/* <Icon icon={CancelIcon} /> */}
              <CancelIcon />
            </IconButton>
            <Typography
              id="server-modal-title"
              variant="h6"
              component="h2"
              color="#E3A130"
            >
              Username of Password does'nt match
            </Typography>
            <Typography
              id="server-modal-description"
              sx={{ pt: 2, color: "white" }}
            >
              Please rechek your form for sure.
            </Typography>
          </Card>
        </Modal>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          // sx={{
          // 	width : '100vw',
          // 	height : '100vh',
          // }}
        >
          <Grid
            xs={12}
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >
            <Typography variant="h5" color="primary.dark">
              Academic Information System
            </Typography>
          </Grid>
          <Grid
            xs={12}
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          >
            <div>
              {/* <Image */}
              <img
                src="/static/login-logo-white.png"
                alt="login-logo"
                width={479}
                height={132}
              />
            </div>
            <div className="login-line"></div>
            <div className="login-form">
              {/* <form method="post" action="/api/auth/callback/credentials" > */}
              <form>
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <label htmlFor="username">
                  Username
                  <input
                    type="text"
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <IconButton
                    className="show-password"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ position: "absolute", padding: "0.35rem" }}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </label>
                <label htmlFor="forgotPassword" className="login-options">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => forgotPassword(true)}
                  >
                    Forgot your Password?
                  </span>
                  <button
                    type="submit"
                    className="login-submit"
                    onClick={(e) => onSignIn(e)}
                  >
                    Sign In
                  </button>
                </label>
              </form>
            </div>
            {/* </div> */}
          </Grid>
        </Grid>
      </div>
      {popUpForgotPassword && (
        <div className="login-form forgot-password">
          <form>
            <CancelIcon
              disabled={disableReset}
              className="cancel"
              onClick={() => forgotPassword(false)}
            />
            <h2>Forgot Password</h2>
            <br />
            <div>
              <span>Enter your email address to retrieve your password</span>
            </div>
            <br />
            <label htmlFor="email">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <span style={{ color: "red" }}>{errorReset}</span>
            <label>
              <button
                type="submit"
                disabled={disableReset}
                className="login-submit"
                onClick={sendForgotPassword}
              >
                {!disableReset ? (
                  "Send Email"
                ) : (
                  <CircularProgress color="inherit" size={10} />
                )}
              </button>
            </label>
          </form>
        </div>
      )}
      <div className="login-copyright">
        <span>
          &copy;{new Date().getFullYear()} University</span>
      </div>

      {/* <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="xl">
        <ContentStyle>
          <FormStyle>
            <Stack sx={{ mb: 5 }}>
          		<img src="/static/login-logo-white.png" alt="login-logo" />
              <Typography variant="h3" sx={{ px: 0, mt: 0, mb: 5, color: '#003B5C' }}>
               Academic Information System
              </Typography>
              <Typography variant="h4" gutterBottom>
                Sign in to ULMS
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
            </Stack>
            <AuthSocial />

            <LoginForm />

            <MHidden width="smUp">
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="register">
                  Get started
                </Link>
              </Typography>
            </MHidden>
          </FormStyle>
        </ContentStyle>
      </Container> */}
      {/* </RootStyle> */}
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  // const csrfToken = context ? await getCsrfToken(context) : null
  return {
    props: {
      csrfToken: (await getCsrfToken(context)) || null,
    },
  };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/
