import styled from "styled-components";
import { colors } from "../../variables";

const resolveBackground = (type) => {
  if (type === 1) return colors.white;
  if (type === 2) return colors.lightBlue;
  if (type === 3) return colors.lightRed;
  if (type === 4) return colors.lightGreen;
};
const resolveColor = (type) => {
  if (type === 1) return colors.black;
  if (type === 2) return colors.blue;
  if (type === 3) return colors.red;
  if (type === 4) return colors.green;
};

export const GuessInput = styled.form`
  display: flex;
  align-items: center;
  height: 45px;
  margin-top: 1rem;
  border-radius: 10px;
  border: solid ${(props) => resolveColor(props.type)} 2px;
  background-color: ${(props) => resolveBackground(props.type)};
  color: ${(props) => resolveColor(props.type)};
  ::placeholder {
    color: ${(props) => resolveColor(props.type)};
  }
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
