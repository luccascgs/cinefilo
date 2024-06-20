import styled from "styled-components";

export const Overlay = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
`;

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  justify-content: center;
  align-items: center;
`;
