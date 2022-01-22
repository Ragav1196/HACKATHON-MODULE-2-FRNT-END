import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API_URL } from "../globalConstants";

export function ResetPassword() {
  async function userLogin(userInfo) {
    await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    email: yup.string().required("Please give your username"),
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
  );
}

// ${API_URL}/login
// ${API_URL}/login
