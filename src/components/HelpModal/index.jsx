import { Link } from "react-router-dom";
import { Emojis } from "../../screens/DailyScreen/style";
import { Modal, Invisible } from "./style";

export default function HelpModal() {
  return (
    <Modal>
      <h2>Como Jogar?</h2>
      <p>
        Descubra qual o filme/série em 5 palpites. Para cada erro um novo emoji
        aparecerá para ajuda-lo a desvendar o filme/série.
      </p>
      <h3>1º Palpite:</h3>
      <Emojis>
        <span>👽</span>
        <Invisible>👀</Invisible>
        <Invisible>👀</Invisible>
        <Invisible>👀</Invisible>
        <Invisible>👀</Invisible>
      </Emojis>
      <h3>5º Palpite:</h3>
      <Emojis>
        <span>👽</span>
        <span>🕶️</span>
        <span>👥</span>
        <span>🔫</span>
        <span>🌌</span>
      </Emojis>
      <p>
        Não precisa colocar o título original, além de que os acentos são
        adicionados automaticamente.
      </p>
      <p>
        Volte amanhã para um novo desafio diário ou explore nossas{" "}
        <Link to="/generos">categorias.</Link>
      </p>
    </Modal>
  );
}
