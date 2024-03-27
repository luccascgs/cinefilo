import styled from "styled-components";

export const OverlayContainer = styled.button`
  z-index: 9999;
  position: fixed;
  content: "";
  background-color: black;
  opacity: 0.7;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
