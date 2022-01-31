import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CallIcon from "@mui/icons-material/Call";
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";
import CampaignIcon from "@mui/icons-material/Campaign";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { SidebarContent } from "./SidebarContent";
import { GetUserType } from "../../authentication/UserType";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";

export function SidebarData({ setTitle }) {
  // DECODING THE USERTYPE FROM THE TOKEN
  let decodedObj = GetUserType();
  const userType = decodedObj.id.userType;

  const content = [
    {
      icon: <HomeIcon />,
      fieldName: "Home",
      onclick: "/home",
    },
    {
      icon: <PeopleAltIcon />,
      fieldName: "Lead",
      addSymbols: "+",
      onclick: "/lead",
    },
    {
      icon:
        userType === "admin" || userType === "manager" ? (
          <FormatLineSpacingIcon />
        ) : (
          ""
        ),
      fieldName: "Add Users",
      onclick: "/register",
    },
    {
      icon: <CalendarTodayIcon />,
      fieldName: "Calendar",
      addSymbols: "+",
      onclick: "/calendar",
    },
    {
      icon: <ContactPhoneIcon />,
      fieldName: "Contacts",
      addSymbols: "+",
      onclick: "/contacts",
    },
    {
      icon: <PersonPinCircleIcon />,
      fieldName: "Service Requests",
      addSymbols: "+",
      onclick: "/service-request",
    },
    {
      icon: <LocalAtmIcon />,
      fieldName: "Deals",
      addSymbols: "+",
    },
    {
      icon: <CallIcon />,
      fieldName: "Calls",
      addSymbols: "+",
    },
    {
      icon: <ArticleIcon />,
      fieldName: "Documents",
      addSymbols: "+",
    },
    {
      icon: <EmailIcon />,
      fieldName: "Email",
    },
    {
      icon: <CampaignIcon />,
      fieldName: "Campaigns",
    },
    {
      icon: <FormatLineSpacingIcon />,
      fieldName: "Forms",
    },
  ];
  return (
    <section className="sidebarContainer">
      {content.map((data, index) => (
        <SidebarContent Data={data} key={index} setTitle={setTitle} />
      ))}
    </section>
  );
}
