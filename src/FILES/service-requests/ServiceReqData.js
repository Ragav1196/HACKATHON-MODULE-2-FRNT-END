import { ServiceReq } from "./ServiceReq";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OutsideClickHandler from "react-outside-click-handler";
import { useFormik } from "formik";
import * as yup from "yup";
import { GetUserType } from "../authentication/UserType";
import { API_URL } from "../globalConstants";

export function ServiceReqData() {
  // DECODING THE USERTYPE FROM THE TOKEN
  let decodedObj = GetUserType();
  const userType = decodedObj.id.userType;

  // AFTER GTTING THE SERVICE REQUESTS STORING IT IN A VARIABLE
  const [serviceReqData, setServiceReqData] = useState([]);

  const serviceReqDataFn = () => {
    fetch(`${API_URL}/service-request`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setServiceReqData(data));
  };

  useEffect(() => serviceReqDataFn(), []);

  return (
    <section className="leadsContainer">
      {userType !== "junior-employee" ? (
        <AddServiceReq serviceReqDataFn={serviceReqDataFn} />
      ) : (
        ""
      )}
      <article className="leadsData">
        {serviceReqData.map((data, index) => (
          <ServiceReq
            data={data}
            serviceReqDataFn={serviceReqDataFn}
            key={index}
          />
        ))}
      </article>
    </section>
  );
}

function AddServiceReq({ serviceReqDataFn }) {
  // TO HIDE INPUT FIELD
  const [show, setShow] = useState(false);
  const [hideAdd, setHideAdd] = useState(true);

  let AddServiceReqFn = (newServiceReq) => {
    fetch(`${API_URL}/service-request`, {
      method: "POST",
      body: JSON.stringify([newServiceReq]),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      values.name = "";
      values.Phone = "";
      values.company = "";
      values.email = "";
      values.title = "";
      values.serviceReqSource = "";
      values.picture =
        "https://i0.wp.com/sguru.org/wp-content/uploads/2017/06/cool-anonymous-profile-pictures-15.jpg?resize=460%2C458&ssl=1";
      setShow(false);
      setHideAdd(true);
      serviceReqDataFn();
    });
  };

  const formValidationSchema = yup.object({
    name: yup.string().required("Client name is required"),
    Phone: yup.number().required("Client number is required"),
    company: yup.string().required("Client company name is required"),
    email: yup.string().required("Client Email is required"),
    title: yup.string().required("Client title is required"),
    serviceReqSource: yup
      .string()
      .required("Client service request source is required"),
    picture: yup
      .string()
      .required("URL for client is required or go with default picture")
      .matches(
        /[(https(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
        "URL pattern doesn't match"
      ),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        Phone: "",
        company: "",
        email: "",
        title: "",
        serviceReqSource: "",
        picture:
          "https://i0.wp.com/sguru.org/wp-content/uploads/2017/06/cool-anonymous-profile-pictures-15.jpg?resize=460%2C458&ssl=1",
      },

      validationSchema: formValidationSchema,

      onSubmit: (newServiceReq) => {
        AddServiceReqFn(newServiceReq);
      },
    });

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShow(false);
        setHideAdd(true);
      }}
    >
      <section className="AuContainer">
        {show ? (
          <form onSubmit={handleSubmit} className="AuForm">
            <TextField
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="name"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter name"
              helperText={errors.name && touched.name && errors.name}
              error={errors.name && touched.name}
            />
            <TextField
              value={values.Phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              name="Phone"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter phone number"
              helperText={errors.Phone && touched.Phone && errors.Phone}
              error={errors.Phone && touched.Phone}
            />
            <TextField
              value={values.company}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="company"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter company"
              helperText={errors.company && touched.company && errors.company}
              error={errors.company && touched.company}
            />
            <TextField
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Email"
              helperText={errors.email && touched.email && errors.email}
              error={errors.email && touched.email}
            />
            <TextField
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="title"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter Title"
              helperText={errors.title && touched.title && errors.title}
              error={errors.title && touched.title}
            />
            <TextField
              value={values.serviceReqSource}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="serviceReqSource"
              id="outlined-basic"
              variant="outlined"
              placeholder="Enter service request source"
              helperText={
                errors.serviceReqSource &&
                touched.serviceReqSource &&
                errors.serviceReqSource
              }
              error={errors.serviceReqSource && touched.serviceReqSource}
            />
            <TextField
              value={values.picture}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="picture"
              id="outlined-basic"
              variant="outlined"
              placeholder="Provide URL for the picture"
              helperText={errors.picture && touched.picture && errors.picture}
              error={errors.picture && touched.picture}
            />
            <span className="auHide">
              <VisibilityOffIcon
                onClick={() => {
                  setShow(false);
                  setHideAdd(true);
                }}
              />
            </span>
            <Button variant="contained" color="success" type="submit">
              SUBMIT
            </Button>
          </form>
        ) : (
          ""
        )}
        {hideAdd ? (
          <Button
            onClick={() => {
              setShow(true);
              setHideAdd(false);
            }}
            variant="contained"
            color="success"
          >
            ADD SERVICE REQUEST
          </Button>
        ) : (
          ""
        )}
      </section>
    </OutsideClickHandler>
  );
}
