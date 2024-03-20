import { Modal, Colaborador } from "./style";

export default function InfoModal() {
  return (
    <Modal>
      <h2>Sobre</h2>
      <p>
        Cinéfilo é um site feito para avaliar nossos conhecimentos no módulo
        frontend do nosso curso de Informática para Internet feito no SENAC.
      </p>
      <p>
        Tudo começou com uma ideia de jogo de mímica, que então foi moldada até
        nosso projeto final: Um jogo de adivinhação de filmes, inspirado no
        lendário{" "}
        <a href="https://term.ooo" target="_blank" rel="noreferrer">
          term.ooo
        </a>
        .
      </p>
      <p>
        Se você gostou, nos dê um fork e uma estrelinha no{" "}
        <a
          href="https://github.com/luccascgs/cinefilo"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        , isso ajuda demais a alavancar nossa carreira!
      </p>
      <h2>Desenvolvedores</h2>
      <Colaborador>
        <a
          href="https://github.com/luccascgs/"
          target="_blank"
          rel="noreferrer"
        >
          Luccas Gomes
        </a>
        <span>Desenvolvedor-Líder</span>
      </Colaborador>
      <Colaborador>
        <a
          href="https://github.com/LucianoKohler"
          target="_blank"
          rel="noreferrer"
        >
          Luciano Kohler
        </a>
        <span>Moderador-gestor</span>
      </Colaborador>
      <Colaborador>
        <a
          href="https://github.com/Vitoria-3436"
          target="_blank"
          rel="noreferrer"
        >
          Vitória Carolina
        </a>
        <span>Geradora de filmes</span>
      </Colaborador>
      <Colaborador>
        <a
          href="https://github.com/lucasgbsilva"
          target="_blank"
          rel="noreferrer"
        >
          Lucas Gabriel
        </a>
        <span>Designer</span>
      </Colaborador>
      <Colaborador>
        <a
          href="https://github.com/helenamaciel"
          target="_blank"
          rel="noreferrer"
        >
          Maria Helena
        </a>
        <span>Designer</span>
      </Colaborador>
    </Modal>
  );
}
