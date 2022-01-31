import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { GetUserType } from "../authentication/UserType";
import { API_URL } from "../globalConstants";

export function Contacts({ data, contactsDataFn }) {
  const history = useHistory();

  // HIDE BUTTONS
  const [show, setShow] = useState(false);

  // DECODING THE USERTYPE FROM THE TOKEN
  let decodedObj = GetUserType();
  const userType = decodedObj.id.userType;

  // TO DELETE A SERVICE REQUEST
  const deleteContacts = (_id) => {
    fetch(`${API_URL}/contacts/${_id}`, {
      method: "DELETE",
      body: JSON.stringify(),
    }).then(() => contactsDataFn());
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShow(false);
      }}
    >
      <section className="leads">
        <article>
          <img src={data.picture} alt={data.name} />
        </article>
        <section>
          <article>
            <p>{data.name}</p>
            <div>
              <div className="leadsDetail1">
                <p>Phone: {data.Phone}</p>
                <p>Comapany: {data.company}</p>
                <p>Email: {data.email}</p>
              </div>
              <div className="leadsDetail2">
                <p>Title: {data.title}</p>
                <p>Contacts Source: {data.contactsSource}</p>
              </div>
            </div>
          </article>
          {userType !== "junior-employee" ? (
            <span onClick={() => setShow(!show)}>
              {show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          ) : (
            ""
          )}
          {show ? (
            <article className="leadsCrud">
              {userType !== "junior-employee" ? (
                <Button
                  onClick={() => {
                    history.push("/contacts/" + data._id);
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  EDIT
                </Button>
              ) : (
                ""
              )}

              {userType !== "junior-employee" ? (
                <Button
                  onClick={() => deleteContacts(data._id)}
                  variant="outlined"
                  color="error"
                >
                  DELETE
                </Button>
              ) : (
                ""
              )}
            </article>
          ) : (
            ""
          )}
        </section>
      </section>
    </OutsideClickHandler>
  );
}
