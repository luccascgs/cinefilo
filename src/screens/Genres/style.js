import styled from "styled-components";

export const Container = styled.main`
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SwiperContainer = styled("swiper-container")`
  left: 0;
  position: absolute;
  width: 100vw;
  height: calc(80% - 50px);
`;
