import { useEffect } from "react";
import { useState } from "react";
import { GetUserType } from "../authentication/UserType";
import { API_URL } from "../globalConstants";

export function MainContent() {
  // DECODING THE USERNAME FROM THE TOKEN
  let decodedObj = GetUserType();
  const userName = decodedObj.id.fname;

  // TO CHANGE COUNTS OF THE LEADS, SERVICE REQUESTS AND CONTACTS:

  const [counts, setCounts] = useState({});

  const Counts = () => {
    fetch(`${API_URL}/get-counts`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        setCounts(data);
      });
  };
  useEffect(() => Counts(), []);

  return (
    <section className="mainContent">
      <article>
        <p>Welcome {userName}</p>
      </article>
      <article>
        <div>
          <p>TOTAL LEADS</p>
          <p>{counts.leadsCount}</p>
        </div>
        <div>
          <p>TOTAL SERVICE REQUESTS</p>
          <p>{counts.serviceReqCount}</p>
        </div>
        <div>
          <p>TOTAL CONTACTS</p>
          <p>{counts.ContactsCount}</p>
        </div>
        <div>
          <p>TOTAL USERS</p>
          <p>{counts.usersCount}</p>
        </div>
      </article>
      <article>
        <div>
          <p>LAST 4 QUARTER PERFORMANCE OVERVIEW </p>
        </div>
        <div>
          <p>ANOMALY IN LEADS CREATION THIS QUARTER</p>
        </div>
        <div>
          <p>LEADS BY SOURCE THIS MONTH</p>
        </div>
        <div>
          <p>ANOMALY IN DEALS CLOSURE AMOUNT THIS QUARTER</p>
        </div>
      </article>
    </section>
  );
}
