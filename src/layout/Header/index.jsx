import { Link } from "react-router-dom";
import { NavBar } from "./style";
import { Calendar, HelpCircle, Info, Tag } from "react-feather";

export default function Header(props) {
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
        <button onClick={props.helpClick}>
          <HelpCircle />
        </button>
        <button onClick={props.infoClick}>
          <Info />
        </button>
      </div>
    </NavBar>
  );
}
