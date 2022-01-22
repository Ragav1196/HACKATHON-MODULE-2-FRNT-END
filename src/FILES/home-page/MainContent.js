import { useState, useEffect } from "react";
import { GetUserType } from "../authentication/UserType";

export function MainContent() {

  // DECODING THE USERNAME FROM THE TOKEN
  let decodedObj = GetUserType();
  const userName = decodedObj.id.fname;

  // TO CHANGE THE LEADS COUNT IN THE DASHBOARD
  const [TotalLeads, setTotalLeads] = useState(0);

  const leadCount = localStorage.getItem("leadCount")  

  useEffect(() => {
    setTotalLeads(leadCount)
  }, [leadCount])
  
  return (
    <section className="mainContent">
      <article>
        <p>Welcome {userName}</p>
      </article>
      <article>
        <div>
          <p>Total leads currently</p>
          <p>{TotalLeads}</p>
        </div>
        <div>
          <p>Revenue This Month</p>
          <p>Rs. 35,000.00 ⬆️ 100%</p>
          <p>Last Month: 0</p>
        </div>
        <div>
          <p>Deals Closing This Month</p>
          <p>10</p>
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
