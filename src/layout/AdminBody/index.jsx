import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../Header";
import { Div } from "./style";
import { getAccessToken } from "../../helper/storageHelper";
import InfoModal from "../../components/InfoModal";
import HelpModal from "../../components/HelpModal";

export default function AdminBody() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) {
      return navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <Div>
      {isHelpOpen && <HelpModal setIsOpen={setIsHelpOpen} />}
      {isInfoOpen && <InfoModal setIsOpen={setIsInfoOpen} />}
      <Header
        helpClick={() => setIsHelpOpen(true)}
        infoClick={() => setIsInfoOpen(true)}
      />
      <Outlet />
    </Div>
  );
}
