import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Div } from "./style";
import InfoModal from "../../components/InfoModal";
import { useState } from "react";
import HelpModal from "../../components/HelpModal";

export default function Body() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
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
