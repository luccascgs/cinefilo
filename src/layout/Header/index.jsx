import { Link } from "react-router-dom";
import { NavBar } from "./style";
import { Calendar, HelpCircle, Info, Tag } from "react-feather";

export default function Header() {
  return (
    <NavBar>
      <div>
        <Link to="/">
          <Calendar />
        </Link>
        <Link to="/generos">
          <Tag />
        </Link>
      </div>
      <Link to="/">CINÉFILO</Link>
      <div>
        <HelpCircle />
        <Info />
      </div>
    </NavBar>
  );
}
