import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL } from "../globalConstants";
import { useHistory } from "react-router-dom";

export function ResetPassword() {
  // TO HIDE THE POPUP:
  const [popup, setPopup] = useState(false);

  const styles = { height: popup ? "40px" : "0px" };

  const history = useHistory();

  async function userLogin(userInfo) {
    const response = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const rstPwdCred = await response.json();
    localStorage.setItem("tokenExpire", rstPwdCred.tokenExpire);

    setPopup(true);
    setTimeout(() => setPopup(false), 5000);
    setTimeout(() => history.push("/login"), 5700);
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    email: yup
      .string()
      .required("Please provide your E-mail")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email pattern doesn't match"
      ),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "ragavinrap@gmail.com",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        userLogin(userInfo);
      },
    });

  return (
    <section>
      <article style={styles} className="rstPwdPopUpCtnr">
        <p className="rstPwdPopUp">
          Check your E-mail for password reset link. you will now be redirected
          to login page
        </p>
      </article>
      <section className="login">
        <article>
          <img
            src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
            alt="reset-password page"
          />
          <form onSubmit={handleSubmit}>
            <TextField
              className="input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type={"text"}
              value={values.email}
              label="email"
              variant="outlined"
              placeholder="Enter your E-mail"
              helperText={errors.email && touched.email && errors.email}
              error={errors.email && touched.email}
            />
            <Button type="submit" variant="contained">
              RESET PASSWORD
            </Button>
          </form>
        </article>
      </section>
    </section>
  );
}

// ${API_URL}/login
// ${API_URL}/login
