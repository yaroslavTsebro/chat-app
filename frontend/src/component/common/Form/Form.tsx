import React from "react";
import Input, { Props } from "../Input/Input";
interface InputProps extends Props {}
interface FormProps {
  inputs: InputProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className: string;
}

const Form = (props: FormProps) => {
  
  return (
    <form onSubmit={props.onSubmit} className={props.className}>
      <div>
        {props.inputs.map((input, index) => (
          <Input
            key={index}
            commonClasses={input.commonClasses}
            errorClasses={input.errorClasses}
            name={input.name}
            validations={input.validations}
            validationMessages={input.validationMessages}
          />
        ))}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
