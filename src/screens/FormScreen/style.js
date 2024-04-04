import styled from "styled-components";
import { colors } from "../../variables";

export const Container = styled.main`
  width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  button {
    width: 100%;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border-radius: 10px;
    border: ${colors.black} 2px solid;

    background-color: ${colors.white};
    color: ${colors.black};
  }

  input {
    all: unset;

    width: 100% !important;
    height: 35px;

    flex: 1;

    border-radius: 10px;
    border: ${colors.black} 2px solid;

    background-color: ${colors.white};
  }
  .send {
    color: ${colors.blue};
    border: ${colors.blue} 2px solid;
    background-color: ${colors.lightBlue};
  }

  .add {
    color: ${colors.green};
    border: ${colors.green} 2px solid;
    background-color: ${colors.lightGreen};
  }

  .title {
    font-weight: 800;
    font-size: 1.3rem;
    text-align: center;
  }

  select {
    width: 30%;
    border-radius: 10px;
    border: ${colors.black} 2px solid;

    background-color: ${colors.white};
  }

  div {
    width: 100%;
    padding: 0 0.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 10px;
    border: ${colors.black} 2px solid;

    background-color: ${colors.white};

    button {
      width: fit-content;
      display: flex;
      background-color: transparent;
      border: none;
    }

    input {
      background-color: transparent;
      border: none;
    }
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

export const Emojis = styled.input`
  height: 80px !important;
  font-size: 3rem !important;
  text-align: center;
`;

export const NamesContainer = styled.article`
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: ${colors.white};
    border-radius: 0.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #b2bccd;
    border-radius: 0.25rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.gray};
  }

  max-height: 250px;
  overflow: auto;
  margin: 1rem 0;
`;
