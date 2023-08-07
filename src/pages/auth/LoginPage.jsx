import React from "react";
import * as Components from "./Components.js";
import "./styles.css";
import {
  API_CREATE_USER,
  API_METHOD_POST,
  API_URL_LOGIN,
} from "../../util/consts.js";
import { ToastContainer, toast } from "react-toastify";
import { TEXT_CONSTANTS } from "../../util/text_constants.js";
import "react-toastify/dist/ReactToastify.css";
import { satoya_api } from "../../util/api.js";

const LoginPage = () => {
  const [signIn, toggle] = React.useState(false);
  const [isFaild, setIsFaild] = React.useState(false);
  const lang = "JP";

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    l_email: "",
    l_password: "",
  });

  const register = async () => {
    satoya_api(API_CREATE_USER, API_METHOD_POST, user).then(
      (res) => {
        if (res.code === 400) {
          setIsFaild(true);
          toast.warn(res.message);
        } else if (res.code === 200) {
          setIsFaild(false);
          toast.success(res.message);
          toggle(true);
        }
      },
      (reject) => {
        console.error("Error:", reject);
        toast.error(TEXT_CONSTANTS.JP.server_error);
        setIsFaild(true);
      }
    );
  };

  const login = async () => {
    satoya_api(API_URL_LOGIN, API_METHOD_POST, {
      email: user.l_email,
      password: user.l_password,
    }).then(
      (res) => {
        if (res.code === 400) {
          setIsFaild(true);
          toast.warn(res.message);
        } else if (res.code === 200) {
          setIsFaild(false);
          toast.success(res.message);
          localStorage.setItem("token", res.token);
          setTimeout(() => (window.location.href = "/"), 5000);
        }
      },
      (reject) => {
        setIsFaild(true);
        toast.error(TEXT_CONSTANTS.JP.server_error);
        console.error("Error:", reject);
      }
    );
  };

  const setUserData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <Components.Container>
        <Components.SignUpContainer signingin={signIn.toString()}>
          <Components.Form>
            <Components.Title>
              {TEXT_CONSTANTS[lang].create_account}
            </Components.Title>
            <Components.Input
              isvalid={isFaild.toString()}
              name="name"
              value={user.name}
              onChange={setUserData}
              type="text"
              placeholder={TEXT_CONSTANTS[lang].username}
            />
            <Components.Input
              isvalid={isFaild.toString()}
              name="email"
              value={user.email}
              onChange={setUserData}
              type="email"
              placeholder={TEXT_CONSTANTS[lang].email}
            />
            <Components.Input
              isvalid={isFaild.toString()}
              name="password"
              value={user.password}
              onChange={setUserData}
              type="password"
              placeholder={TEXT_CONSTANTS[lang].password}
            />
            <Components.Button onClick={register}>
              {TEXT_CONSTANTS[lang].join}
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingin={signIn.toString()}>
          <Components.Form>
            <Components.Title>{TEXT_CONSTANTS[lang].login}</Components.Title>
            <Components.Input
              isvalid={isFaild.toString()}
              onChange={setUserData}
              type="email"
              name="l_email"
              placeholder={TEXT_CONSTANTS[lang].email}
            />
            <Components.Input
              isvalid={isFaild.toString()}
              onChange={setUserData}
              type="password"
              name="l_password"
              placeholder={TEXT_CONSTANTS[lang].password}
            />
            <Components.Anchor href="#">
              {TEXT_CONSTANTS[lang].forgot_password}
            </Components.Anchor>
            <Components.Button onClick={login}>
              {TEXT_CONSTANTS[lang].login}
            </Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingin={signIn.toString()}>
          <Components.Overlay signingin={signIn.toString()}>
            <Components.LeftOverlayPanel signingin={signIn.toString()}>
              <Components.Title>
                {TEXT_CONSTANTS[lang].login_title}
              </Components.Title>
              <Components.Paragraph>
                {TEXT_CONSTANTS[lang].login_description}
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                {TEXT_CONSTANTS[lang].login}
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingin={signIn.toString()}>
              <Components.Title>
                {TEXT_CONSTANTS[lang].register_title}
              </Components.Title>
              <Components.Paragraph>
                {TEXT_CONSTANTS[lang].register_description}
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                {TEXT_CONSTANTS[lang].join}
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default LoginPage;
