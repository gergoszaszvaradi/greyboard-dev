import React from "react";
import { Link } from "react-router-dom";

import "./ui.scss";
import { className } from "../../utils/format";

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
            <button type="button" className={`button ${size} ${className(primary, "primary")}`} onClick={onClick}>{children}</button>
        );
    }
    return (
        <Link to={to} className={`button ${size} ${className(primary, "primary")}`}>{children}</Link>
    );
};
Button.defaultProps = {
    primary: false,
    size: "small",
    to: undefined,
    onClick: undefined,
};
