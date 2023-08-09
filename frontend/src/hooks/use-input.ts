import { useState } from "react";

export type State = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  inputBlurHandler: React.ChangeEventHandler<HTMLInputElement>;
  reset: Function;
};

const useInput = (validationFunction: Function): State => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [valueInputIsTouched, setValueInputIsTouched] =
    useState<boolean>(false);

  const enteredValueIsValid = validationFunction(enteredValue);
  const hasError = !enteredValueIsValid && valueInputIsTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValueInputIsTouched(true);
  };

  const reset = (): void => {
    setValueInputIsTouched(false);
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
