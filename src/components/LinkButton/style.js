import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../variables";

export const Button = styled(Link)`
  width: fit-content;

  margin-top: 1rem;
  padding: 0.1rem 0.5rem;

  border-radius: 10px;
  border: ${colors.black} 2px solid;

  background-color: ${colors.white};
  color: ${colors.black};

  text-decoration: none;
`;
