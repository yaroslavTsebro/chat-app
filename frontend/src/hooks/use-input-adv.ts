import { useState } from "react";

type State = [
  enteredValue: string,
  enteredValueIsValid: boolean,
  isTouched: boolean,
  hasError: boolean[],
  valueChangeHandler: React.ChangeEventHandler<HTMLInputElement>,
  inputBlurHandler: React.ChangeEventHandler<HTMLInputElement>,
  reset: Function
];

const useInputAdv = (functions: Function[]):State => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [valueInputIsTouched, setValueInputIsTouched] =
    useState<boolean>(false);

  const validationResults: boolean[] = functions.map((func) =>
    Boolean(func(enteredValue))
  );
  const enteredValueIsValid = !validationResults.includes(false);

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

  return [
    enteredValue,
    enteredValueIsValid,
    valueInputIsTouched,
    validationResults,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  ];
};

export default useInputAdv;
