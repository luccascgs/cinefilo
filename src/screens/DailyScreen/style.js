import styled from "styled-components";
import { colors } from "../../variables";

const resolveVisibility = (visibility) => {
  if (visibility === 1) return "visible";
  if (visibility === 0) return "hidden";
};

export const Container = styled.main`
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h1`
  margin: 0.5rem auto;
  width: fit-content;

  padding: 0.2rem 1rem;

  border: ${colors.black} solid 2px;
  border-radius: 1rem;

  font-size: 1.2rem;
  font-weight: 700;

  background-color: ${colors.white};
  color: ${colors.black};
`;

export const Emojis = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 3.7rem;
  margin-bottom: 2rem;
  height: 110px;
  min-height: 110px;
  overflow: hidden;
  border-radius: 10px;
  border: solid ${colors.black} 2px;
  background-color: ${colors.white};
`;

export const Emoji = styled.span`
  visibility: ${(props) => resolveVisibility(props.visibility)};
`;
