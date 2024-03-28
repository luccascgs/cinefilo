import { useState } from "react";
import { GuessInput } from "./style";
import { Check, Edit2, MessageCircle, X } from "react-feather";

export default function GameInput(props) {
  const [inputValue, setInputValue] = useState("");
  function handleChange(event) {
    setInputValue(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (props.onSubmit) {
      props.onSubmit(inputValue);
    }
  }

  function currentText() {
    if (props.type === 1) return `Digite um título`;
    else return `${props.id}º Palpite`;
  }
  function setReadOnly() {
    if (props.type === 1) return false;
    else return true;
  }

  return (
    <GuessInput type={props.type} onSubmit={handleSubmit}>
      {props.type === 1 && <Edit2 />}
      {props.type === 2 && <MessageCircle />}
      {props.type === 3 && <X />}
      {props.type === 4 && <Check />}
      <input
        type="text"
        placeholder={currentText()}
        readOnly={setReadOnly()}
        value={inputValue}
        onChange={handleChange}
      />
    </GuessInput>
  );
}
