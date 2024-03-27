import styled from "styled-components";
import { colors } from "../../variables";

export const Div = styled.div`
  color: ${colors.black};
  background: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png"),
    linear-gradient(to top, ${colors.darkBlueBg}, ${colors.blueBg});
`;

export const Overlay = styled.button`
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
