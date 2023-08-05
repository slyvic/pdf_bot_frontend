import React from "react";
import * as Components from "./Components.js";
import "./styles.css";
import { API_URL } from "../util/consts.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [signIn, toggle] = React.useState(false);
  const [isFaild, setIsFaild] = React.useState(false);

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    l_email: "precious6world@gmail.com",
    l_password: "Basilisk011207)!!@)&",
  });

  const register = async () => {
    await fetch(API_URL + "create-user", {
      method: "post",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 400) {
          setIsFaild(true);
          toast.warn(data.message);
        } else if (data.code === 200) {
          setIsFaild(false);
          toast.success(data.message);
					toggle(true)
        }
      })
      .catch((error) => {
        setIsFaild(true);
        console.error("Error:", error);
      });
  };

  const login = async () => {
    await fetch(API_URL + "login", {
      method: "post",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: user.l_email, password: user.l_password}),
    })
      .then((response) => response.json())
      .then((data) => {
				console.log(data)
        if (data.code === 400) {
          setIsFaild(true);
          toast.warn(data.message);
        } else if (data.code === 200) {
          setIsFaild(false);
          toast.success(data.message);
    			localStorage.setItem("token", data.token);
					setTimeout(() => window.location.href = '/', 5000)
        }
      })
      .catch((error) => {
        setIsFaild(true);
        console.error("Error:", error);
      });
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
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              isvalid={isFaild.toString()}
              name="name"
              value={user.name}
              onChange={setUserData}
              type="text"
              placeholder="Name"
            />
            <Components.Input
              isvalid={isFaild.toString()}
              name="email"
              value={user.email}
              onChange={setUserData}
              type="email"
              placeholder="Email"
            />
            <Components.Input
              isvalid={isFaild.toString()}
              name="password"
              value={user.password}
              onChange={setUserData}
              type="password"
              placeholder="Password"
            />
            <Components.Button onClick={register}>参加する</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingin={signIn.toString()}>
          <Components.Form>
            <Components.Title> ログイン</Components.Title>
            <Components.Input
              isvalid={isFaild.toString()}
              onChange={setUserData}
              type="email"
              name="l_email"
              placeholder="Email"
            />
            <Components.Input
              isvalid={isFaild.toString()}
              onChange={setUserData}
              type="password"
              name="l_password"
              placeholder="Password"
            />
            <Components.Anchor href="#">
              パスワードをお忘れですか？
            </Components.Anchor>
            <Components.Button onClick={login}> ログイン</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingin={signIn.toString()}>
          <Components.Overlay signingin={signIn.toString()}>
            <Components.LeftOverlayPanel signingin={signIn.toString()}>
              <Components.Title>もう一度ようこそ！</Components.Title>
              <Components.Paragraph>
                引き続きご連絡いただくには、個人情報でログインしてください
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                ログイン
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingin={signIn.toString()}>
              <Components.Title>こんにちは、友達！</Components.Title>
              <Components.Paragraph>
                個人情報を入力し、私たちと一緒に旅行を始めましょう
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                参加する
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default LoginPage;
