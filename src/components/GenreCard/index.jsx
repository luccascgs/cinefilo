import { Link } from "react-router-dom";
import { Card } from "./style";

export function GenreCard(props) {
  return (
    <Card color1={props.color1} color2={props.color2}>
      <Link to={props.link}>
        <props.icon />
        <footer>
          <span>{props.title}</span>
        </footer>
      </Link>
    </Card>
  );
}
