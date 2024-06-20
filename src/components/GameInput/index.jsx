import { useRef, useState, useEffect } from "react";
import { GuessInput } from "./style";
import { Check, Edit2, MessageCircle, X } from "react-feather";

export default function GameInput(props) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.type === 1 && props.index === props.currentGuess) {
      inputRef.current.focus();
    }
  }, [props.type, props.currentGuess, props.index]);

  function handleSubmit(event) {
    event.preventDefault();
    if (props.onSubmit) {
      inputRef.current.blur();
      props.onSubmit(inputValue);
    }
  }

  function currentText() {
    if (props.type === 1) return `Digite um título`;
    else return `${props.id}º Palpite`;
  }

  function setReadOnly() {
    if (props.type === 1) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <GuessInput type={props.type} onSubmit={handleSubmit}>
      {props.type === 1 && <Edit2 />}
      {props.type === 2 && <MessageCircle />}
      {props.type === 3 && <X />}
      {props.type === 4 && <Check />}
      <input
        ref={inputRef}
        type="text"
        placeholder={currentText()}
        readOnly={setReadOnly()}
        value={props.value && props.type === 4 ? props.value : inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus={props.type === 1 && props.index === props.currentGuess}
      />
    </GuessInput>
  );
}
