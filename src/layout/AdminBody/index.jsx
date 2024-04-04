import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { Div } from "./style";
import { getAccessToken } from "../../helper/storageHelper";
import { useEffect } from "react";

export default function AdminBody() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      return navigate("/login");
    }
  }, [accessToken]);

  return (
    <Div>
      <Header />
      <Outlet />
    </Div>
  );
}
