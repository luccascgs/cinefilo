import { GuessInput } from "./style";
import { Edit2 } from "react-feather";

export default function GameInput() {
  return (
    <GuessInput>
      <Edit2 />
      <input type="text" placeholder="Digite um título" />
    </GuessInput>
  );
}
