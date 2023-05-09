import React, { FC, useRef } from "react"
import sty from "./input.module.scss"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    width: string;
    id: string;
    register: any;
    name: string;
    error: boolean;
}


const Input: FC<InputProps> = ({ placeholder, width, id, register, name, error, ...props }) => {
    return (
        <>
            <div className={`${sty.input} ${error ? sty.error : ""}`} style={{width: width}} >
                <input id={id} placeholder=" " {...register && register(name)} {...props} />
                <label className={sty.placeholder} htmlFor={id}>{placeholder}</label>
            </div>
        </>
    )
}

export default Input;