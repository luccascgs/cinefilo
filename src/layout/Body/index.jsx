import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Div } from "./style";
import Overlay from "../../components/Overlay";
import InfoModal from "../../components/InfoModal";

export default function Body() {
  const [modalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    console.log("alterou");
  };

  return (
    <Div>
      <Overlay onClick={toggleModal} />
      {modalVisible && <InfoModal />}
      <Header />
      <Outlet />
    </Div>
  );
}
