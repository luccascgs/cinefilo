import { Button } from "./style";

export function LinkButton(props) {
  return <Button to={props.to}>{props.children}</Button>;
}
