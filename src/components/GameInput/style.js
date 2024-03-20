import styled from "styled-components";
import { colors } from "../../variables";

export const GuessInput = styled.div`
  display: flex;
  align-items: center;
  height: 45px;
  margin-top: 1rem;
  border: solid ${colors.black} 2px;
  border-radius: 10px;
  background-color: ${colors.white};
  color: ${colors.black};

  & * {
    margin-left: 0.7rem;
  }

  input {
    all: unset;
    padding-left: 0.7rem;
    width: 100%;
    height: 45px;
  }
`;
