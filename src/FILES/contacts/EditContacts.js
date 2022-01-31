import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { API_URL } from "../globalConstants";

export function EditContactsFn() {
  const { id } = useParams();

  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/contacts/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setContacts(data));
  }, [id]);

  return contacts ? <EditContacts contacts={contacts} id={id} /> : "";
}

export function EditContacts({ contacts, id }) {
  const history = useHistory();

  const formValidationSchema = yup.object({
    name: yup.string().required("Client name is required"),
    Phone: yup.number().required("Client number is required"),
    company: yup.string().required("Client company name is required"),
    email: yup.string().required("Client Email is required"),
    title: yup.string().required("Client title is required"),
    contactsSource: yup
      .string()
      .required("Client contacts source is required"),
    picture: yup
      .string()
      .required("URL for client is required or go with default picture")
      .matches(
        /[(https(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
        "URL pattern doesn't match"
      ),
  });

  let dataFrmDB = (updatedContacts) => {
    fetch(`${API_URL}/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedContacts),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/contacts"));
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: contacts.name,
        Phone: contacts.Phone,
        company: contacts.company,
        email: contacts.email,
        title: contacts.title,
        contactsSource: contacts.contactsSource,
        picture: contacts.picture,
      },

      validationSchema: formValidationSchema,

      onSubmit: (updatedContacts) => {
        dataFrmDB(updatedContacts);
      },
    });
  return (
    <section className="ElContainer">
      <p>EDIT CONTACTS</p>
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
          value={values.contactsSource}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="contactsSource"
          id="outlined-basic"
          variant="outlined"
          placeholder="Enter contacts source"
          helperText={
            errors.contactsSource &&
            touched.contactsSource &&
            errors.contactsSource
          }
          error={errors.contactsSource && touched.contactsSource}
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
