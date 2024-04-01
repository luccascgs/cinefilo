import styled from "styled-components";

export const Card = styled("swiper-slide")`
  height: 80%;
  text-align: center;
  font-size: 3rem;
  border-radius: 1rem;
  font-weight: 700;
  line-height: 3rem;
  footer {
    z-index: 2;
    border-radius: 1rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
  }
  svg {
    z-index: 1;
    position: absolute;
    color: var(--white);
    width: 60%;
    height: 80%;
    left: calc(20%);
  }
`;
