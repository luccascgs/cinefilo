import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Div } from "./style";

export default function Body() {
  return (
    <Div>
      <Header />
      <Outlet />
    </Div>
  );
}
