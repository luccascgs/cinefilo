import styled from "styled-components";
import { colors } from "../../variables";

export const NavBar = styled.nav`
  width: 500px;
  height: 50px;
  margin: auto;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;

  color: ${colors.white};
  div * + * {
    margin-left: 1.5rem;
  }

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: 900;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    color: currentColor;
  }
`;
