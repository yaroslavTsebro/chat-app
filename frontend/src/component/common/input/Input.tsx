import useInputAdv from "../../hooks/use-input-adv";

export interface Props {
  name: string;
  validationMessages: string[];
  validations: Function[];
  commonClasses: string;
  errorClasses: string;
}

const Input = ({
  name,
  validations,
  validationMessages,
  commonClasses,
  errorClasses,
}: Props) => {
  if (validations.length !== validationMessages.length) {
    throw new Error(
      "validations and validationMessages must have the same length"
    );
  }

  const [
    value,
    valueIsValid,
    isTouched,
    validation,
    valueChangeHandler,
    valueBlurHandler,
    resetValueInput,
  ] = useInputAdv(validations);

  const hasError = validation.includes(false) && isTouched;
  const classNames = commonClasses + " " + (hasError ? errorClasses : "");

  return (
    <>
      <div className={classNames}>
        <label htmlFor={name}>{name}</label>
        <input
          type="text"
          id={name}
          value={value}
          onChange={valueChangeHandler}
          onFocus={valueBlurHandler}
        />
        {validationMessages.map(
          (message, index) =>
            !validation[index] &&
            isTouched && (
              <p className="error-text" key={index}>
                {message}
              </p>
            )
        )}
      </div>
    </>
  );
};

export default Input;
