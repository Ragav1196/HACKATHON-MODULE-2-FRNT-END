import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { GetUserType } from "./UserType";
import * as yup from "yup";
import { context } from "../link/Links";

export function Register() {

  // TO SET THE TITLE AFTER GOING BACK FROM THIS PAGE:
  const { setTitle } = useContext(context);

  const { titleReg } = useContext(context);

  // DECODING THE TOKEN TO GET THE USERTYPE
  let decodedObj = GetUserType();
  const userType = decodedObj.id.userType;

  // TO SHOW SHOW THE ERROR MESSAGE WHEN IT OCCURS
  const [username, setUsername] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [bothCred, setBothCred] = useState(false);

  const history = useHistory();

  // TO PUSH THE NEW USER TO THE SERVER STORAGE:
  async function RegisterUser(userInfo) {
    const response = await fetch("http://localhost:9000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (data.acknowledged) {
      history.push("/login");
    }

    if (data.message === "Username and Email already exists") {
      setBothCred(true);
    }

    if (data.message === "Username already exists") {
      setUsername(true);
    }

    if (data.message === "User Email already exists") {
      setUserEmail(true);
    }
  }

  // VALIDATIONS
  const formValidationSchema = yup.object({
    name: yup.string().required("Please give your username"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password must be longer")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g,
        "Password pattern doesn't match"
      ),
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
        name: "",
        password: "",
        email: "",
        userType: "",
      },
      validationSchema: formValidationSchema,

      onSubmit: (userInfo) => {
        RegisterUser(userInfo);
      },
    });

  function SetToFalse() {
    if (username) {
      setUsername(false);
    }
    if (userEmail) {
      setUserEmail(false);
    }
    if (bothCred) {
      setBothCred(false);
    }
  }

  return (
    <section onClick={() => SetToFalse()}>
      <article className="backButton">
        <Button
          onClick={() => {
            setTitle(titleReg)
            history.goBack();
          }}
          color="warning"
          variant="contained"
        >
          GO BACK
        </Button>
      </article>
      <article className="register">
        <article>
          <img
            src="https://image.shutterstock.com/z/stock-vector-concept-sign-in-page-on-mobile-screen-desktop-computer-with-login-form-and-sign-in-button-for-web-1145292776.jpg"
            alt="Register page"
          />
          <form onSubmit={handleSubmit}>
            {username ? (
              <p className="signInError">Username already exists</p>
            ) : (
              ""
            )}
            {userEmail ? (
              <p className="signInError">User Email already exists</p>
            ) : (
              ""
            )}
            {bothCred ? (
              <p className="signInError">Username and Email already exists</p>
            ) : (
              ""
            )}
            <TextField
              className="input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              type={"text"}
              value={values.name}
              label="Name"
              variant="outlined"
              placeholder="Enter your name"
              helperText={errors.name && touched.name && errors.name}
              error={errors.name && touched.name}
            />
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
              helperText={
                errors.password && touched.password && errors.password
              }
              error={errors.password && touched.password}
            />
            <TextField
              className="input"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              type={"email"}
              value={values.email}
              label="E-mail"
              variant="outlined"
              placeholder="Enter your E-mail"
              helperText={errors.email && touched.email && errors.email}
              error={errors.email && touched.email}
            />
            <div className="RegRadioBtn">
              <p>Select user role:</p>
              {userType === "admin" ? (
                <div>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      id="admin"
                      required
                      value="admin"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Admin
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="manager"
                      required
                      id="manager"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    Manager
                  </label>
                </div>
              ) : (
                ""
              )}
              <div>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    id="senior-employee"
                    required
                    value="senior-employee"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Senior Employee
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    id="junior-employee"
                    required
                    value="junior-employee"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  Junior Employee
                </label>
              </div>
            </div>
            <Button type="submit" variant="contained">
              SUBMIT
            </Button>
          </form>
        </article>
      </article>
    </section>
  );
}

// http://localhost:9000/register
// http://localhost:9000/register
