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
          <p>Total Leads</p>
          <p>{counts.leadsCount}</p>
        </div>
        <div>
          <p>Total Service Requests</p>
          <p>{counts.serviceReqCount}</p>
        </div>
        <div>
          <p>Total Contacts</p>
          <p>{counts.ContactsCount}</p>
        </div>
        <div>
          <p>Overdue Tasks</p>
          <p>9</p>
        </div>
      </article>
      <article>
        <div>
          <p>Last 4 Quarter Performance Overview</p>
        </div>
        <div>
          <p>Anomaly In Leads Creation This Quarter</p>
        </div>
        <div>
          <p>Leads By Source This Month</p>
        </div>
        <div>
          <p>Anomaly In Deals Closure Amount This Quarter</p>
        </div>
      </article>
    </section>
  );
}
