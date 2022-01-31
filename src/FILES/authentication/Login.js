import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL } from "../globalConstants";

export function Login() {
  const history = useHistory();

  // TO GIVE ERROR WHEN CREDENTIALS IS INVALID:
  const [loginError, setLoginError] = useState(false);

  // TO GIVE ERROR FOR TOKEN EXPIRATION:
  const isTokenExpired = localStorage.getItem("tokenExpired");
  const [tknExp, setTknExp] = useState(isTokenExpired);
  setTimeout(() => {
    localStorage.removeItem("tokenExpired");
    setTknExp(false);
  }, 5000);

  // CHECKING THE SERVER STORAGE TO VERIFY THE CREDENTIALS
  async function userLogin(userInfo) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (data.message === "Successfull login") {
      localStorage.setItem("Token", data.token);
      history.push("/home");
    }

    if (data.message === "Invalid credentials") {
      setLoginError(true);
    }
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    username: yup.string().required("Please give your username"),
    password: yup.string().required("Please provide password"),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        username: "Ragav1196",
        password: "Ragav123@",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        userLogin(userInfo);
      },
    });

  return (
    <section onClick={() => setLoginError(false)} className="login">
      <div className="tokenExpPopupCntr">
        {tknExp ? (
          <p className="tokenExpPopup">
            TOKEN IS EXPIRED. RETRY PASSWORD CHANGE
          </p>
        ) : (
          ""
        )}
      </div>
      <article>
        <img
          src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
          alt="Login page"
        />
        <form onSubmit={handleSubmit}>
          {loginError ? <p className="signInError">INVALID CREDENTIALS</p> : ""}
          <TextField
            className="input"
            onChange={handleChange}
            onBlur={handleBlur}
            name="username"
            type={"text"}
            value={values.username}
            label="userName"
            variant="outlined"
            placeholder="Enter your username"
            helperText={errors.username && touched.username && errors.username}
            error={errors.username && touched.username}
          />
          <br />
          <TextField
            className="input"
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type={"password"}
            value={values.password}
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            helperText={errors.password && touched.password && errors.password}
            error={errors.password && touched.password}
          />
          <p
            onClick={() => history.push("/reset-password")}
            className="forgotPwd"
          >
            Forgot password ?
          </p>
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
        </form>
      </article>
    </section>
  );
}
