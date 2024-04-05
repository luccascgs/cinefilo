import { useNavigate } from "react-router-dom";
import { Container } from "./style";

export function LinkIcon({ icon: Icon, to }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Icon onClick={() => navigate(to)} />
    </Container>
  );
}
