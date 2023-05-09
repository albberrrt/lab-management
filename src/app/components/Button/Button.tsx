import React, { FC, useRef } from "react"

import sty from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    id: string;
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ value, id, onClick, ...props }) => {
    return (
        <div className={sty.button}>
            <button id={id}></button>
            <label htmlFor={id}>{value}</label>
        </div>
    )
}
export default Button;