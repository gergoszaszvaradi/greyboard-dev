import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";
import { className } from "../../utils/format";

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
}) : ReactElement => {
    if (to === undefined)
        return (
            <button type="button" className={`${styles.button} ${size ? styles[size] : ""} ${className(primary, styles.primary)}`} onClick={onClick}>{children}</button>
        );

    return (
        <Link to={to} className={`${styles.button} ${size ? styles[size] : ""} ${className(primary, styles.primary)}`}>{children}</Link>
    );
};
Button.defaultProps = {
    primary: false,
    size: "small",
    to: undefined,
    onClick: undefined,
};
export default Button;
