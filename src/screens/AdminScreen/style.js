import styled from "styled-components";
import { colors } from "../../variables";

export const Container = styled.main`
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
`;

export const Table = styled.div`
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

  max-height: 80%;

  padding: 1rem;

  overflow: auto;

  background-color: ${colors.white};
  border: ${colors.black} solid 2px;
  border-radius: 10px;

  div + div {
    margin-top: 0.5rem;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  div * + * {
    margin-left: 1rem;
  }

  a {
    color: ${colors.black};
  }

  svg:hover {
    cursor: pointer;
  }
  border-bottom: solid ${colors.gray} 2px;
`;

export const QuerryInput = styled.input`
  all: unset;
  width: 100%;
  height: 45px;
`;

export const QuerryForm = styled.form`
  padding: 0 1rem;
  margin-bottom: 1rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background-color: ${colors.white};
  border: ${colors.black} solid 2px;
  border-radius: 10px;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  color: ${colors.black};
`;
