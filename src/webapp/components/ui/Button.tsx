import React from "react";
import { Link } from "react-router-dom";

import "./ui.scss";

interface ButtonProps {
    primary? : boolean;
    size? : "small"|"big";
    to? : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}

export const Button : React.FC<ButtonProps> = ({
    primary,
    size,
    to,
    onClick,
    children,
}) => {
    if (to === undefined) {
        return (
            <button type="button" className={`button ${size} ${primary ? "primary" : ""}`} onClick={onClick}>{children}</button>
        );
    }
    return (
        <Link to={to} className={`button ${size} ${primary ? "primary" : ""}`}>{children}</Link>
    );
};
Button.defaultProps = {
    primary: false,
    size: "small",
    to: undefined,
    onClick: undefined,
};
