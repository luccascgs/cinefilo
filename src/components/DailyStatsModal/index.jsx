import { Modal } from "./style";
import { Overlay, Container } from "../overlay";

export default function HelpModal({ setIsOpen }) {
  return (
    <Container>
      <Overlay onClick={() => setIsOpen(false)} />
      <Modal>a</Modal>
    </Container>
  );
}
