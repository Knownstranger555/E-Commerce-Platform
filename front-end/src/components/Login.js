import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    // console.log("hi this is ur mail and password", email, password);

    // let result = await fetch("http://localhost:5000/login", {
    //   method: "post",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // result = await result.json();
    // console.log(result);

    // if (result.name) {
    //   localStorage.setItem("user", JSON.stringify(result));
    //   navigate("/");
    // } else {
    //   alert("please enter the correct details");
    // }

    let result = await fetch("http://localhost:5000/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  result = await result.json();
  console.warn(result)
  if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/")
  } else {
      alert("Please enter connect details")
  }
  };

  return (
    <div className="login">
      <input
        type="text"
        className="inputBox"
        placeholder="enter email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="enter password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />

      <button onClick={handleLogin} className="appbutton" type="button">
        {" "}
        Login
      </button>
    </div>
  );
};

export default Login;
