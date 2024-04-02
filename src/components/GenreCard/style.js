import styled from "styled-components";
import { colors } from "../../variables";

export const Card = styled("swiper-slide")`
  height: 80%;
  text-align: center;
  font-size: 3rem;
  border-radius: 1rem;
  font-weight: 700;
  line-height: 3rem;
  background-color: ${(props) => props.color2};
  footer {
    z-index: 2;
    border-radius: 1rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0) 30%, currentColor 100%);
  }
  svg {
    z-index: 1;
    position: absolute;
    color: ${colors.white};
    width: 60%;
    height: 80%;
    left: calc(20%);
  }
  span {
    z-index: 3;
    color: ${colors.white};
    padding: 3rem 3rem;
  }
  a {
    color: ${(props) => props.color1};
  }
`;
