import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../variables";

export const Button = styled(Link)`
  width: fit-content;

  margin-top: 1rem;
  padding: 0.1rem 0.5rem;

  border-radius: 10px;
  border: ${colors.green} 2px solid;

  background-color: ${colors.lightGreen};
  color: ${colors.green};

  text-decoration: none;
`;
