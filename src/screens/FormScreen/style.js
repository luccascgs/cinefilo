import styled from "styled-components";

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
  input {
    flex: 1;
  }
  select {
    width: 30%;
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

export const Emojis = styled.input``;
