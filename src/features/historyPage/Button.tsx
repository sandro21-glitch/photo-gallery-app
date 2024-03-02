// Button.tsx
import { ReactNode, MouseEventHandler } from "react";
import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="button-10" role="button" type="button">
      {children}
    </button>
  );
};

export default Button;
