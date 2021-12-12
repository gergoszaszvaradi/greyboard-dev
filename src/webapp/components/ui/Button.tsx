import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    primary? : boolean;
    size? : "small"|"big";
    to? : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

const Button : React.FC<ButtonProps> = ({
    primary,
    size,
    to,
    onClick,
    children,
}) => {
    if (to === undefined) {
        return (
            <button type="button" className={`rounded-button ${size} ${primary ? "primary" : ""}`} onClick={onClick}>{children}</button>
        );
    }
    return (
        <Link to={to} className={`rounded-button ${size} ${primary ? "primary" : ""}`}>{children}</Link>
    );
};
Button.defaultProps = {
    primary: false,
    size: "small",
    to: undefined,
    onClick: undefined,
};

export default Button;
