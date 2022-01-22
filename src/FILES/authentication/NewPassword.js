import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL } from "../globalConstants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

export function NewPassword() {
  const history = useHistory();

  const { token } = useParams();
  console.log(token);

  async function userLogin(userInfo) {
    await fetch(`${API_URL}/new-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then(() => history.push("/login"));
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    password: yup.string().required("Please give your username"),
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
            helperText={errors.password && touched.password && errors.password}
            error={errors.password && touched.password}
          />
          <Button type="submit" variant="contained">
            UPDATE PASSWORD
          </Button>
        </form>
      </article>
    </section>
  );
}

// ${API_URL}/login
// ${API_URL}/login
