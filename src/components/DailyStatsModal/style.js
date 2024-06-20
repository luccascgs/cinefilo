import styled from "styled-components";
import { colors } from "../../variables";

export const Modal = styled.div`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.white};
    border-radius: 0.25rem;
    margin: 10px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #b2bccd;
    border-radius: 0.25rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray};
  }

  position: fixed;
  max-height: 550px;
  width: 500px;
  padding: 1rem 2rem;
  overflow-y: auto;
  z-index: 9999;
  border-radius: 20px;
  border: ${colors.gray} 2px solid;
  background-color: ${colors.white};
  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }
  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  p {
    margin-bottom: 1.5rem;
  }
  a {
    color: ${colors.blue};
    text-decoration: none;
    font-weight: 600;
  }
`;
