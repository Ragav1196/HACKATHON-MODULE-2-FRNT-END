import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { API_URL } from "../globalConstants";

export function EditServiceReqFn() {
  const { id } = useParams();

  const [serviceReq, setServiceReq] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/service-request/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setServiceReq(data));
  }, [id]);

  return serviceReq ? <EditServiceReq serviceReq={serviceReq} id={id} /> : "";
}

export function EditServiceReq({ serviceReq, id }) {
  const history = useHistory();

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

  let dataFrmDB = (updatedServiceReq) => {
    fetch(`${API_URL}/service-request/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedServiceReq),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/service-request"));
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: serviceReq.name,
        Phone: serviceReq.Phone,
        company: serviceReq.company,
        email: serviceReq.email,
        title: serviceReq.title,
        serviceReqSource: serviceReq.serviceReqSource,
        picture: serviceReq.picture,
      },

      validationSchema: formValidationSchema,

      onSubmit: (updatedServiceReq) => {
        dataFrmDB(updatedServiceReq);
      },
    });
  return (
    <section className="ElContainer">
      <p>EDIT SERVICE REQUESTS</p>
      <form onSubmit={handleSubmit} className="ElForm">
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
        <article>
          <Button
            type="submit"
            variant="outlined"
            color="success"
          >
            SAVE
          </Button>
        </article>
      </form>
    </section>
  );
}
