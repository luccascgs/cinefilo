import styled from "styled-components";
import { colors } from "../../variables";

export const Container = styled.main`
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  h2 {
    margin-top: 0.5rem;
    width: 100%;
    color: ${colors.white};
    font-weight: 600;
  }

  input {
    width: 100%;
    border-radius: 10px;
    border: ${colors.black} 2px solid;

    background-color: ${colors.white};
  }

  button {
    margin-top: 1rem;

    width: 100%;
    height: 35px;

    border-radius: 10px;
    border: ${colors.blue} 2px solid;

    background-color: ${colors.lightBlue};
    color: ${colors.blue};
  }
`;
