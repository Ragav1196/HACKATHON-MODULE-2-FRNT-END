import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL } from "../globalConstants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

export function NewPassword() {
  const history = useHistory();

  // TO HIDE THE POPUP:
  const [popup, setPopup] = useState(false);

  const styles = { height: popup ? "40px" : "0px" };

  const { token } = useParams();
  console.log(token);

  async function userLogin(userInfo) {
    await fetch(`${API_URL}/new-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    setPopup(true);
    setTimeout(() => setPopup(false), 5000);
    setTimeout(() => history.push("/login"), 5700);
    localStorage.removeItem("tokenExpire");
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password must be longer")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g,
        "Password pattern doesn't match"
      ),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        userInfo.token = token;
        userLogin(userInfo);
      },
    });

  return (
    <section>
      <article style={styles} className="rstPwdPopUpCtnr">
        <p className="rstPwdPopUp">
          Password successfully updated. you will be redirected to login page
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
              name="password"
              type="password"
              value={values.password}
              label="password"
              variant="outlined"
              placeholder="Enter your new password"
              helperText={
                errors.password && touched.password && errors.password
              }
              error={errors.password && touched.password}
            />
            <Button type="submit" variant="contained">
              UPDATE PASSWORD
            </Button>
          </form>
        </article>
      </section>
    </section>
  );
}

// ${API_URL}/login
// ${API_URL}/login
