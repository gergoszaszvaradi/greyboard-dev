import React, { ReactElement, useEffect, useState } from "react";

import styles from "./ToolbarInput.module.scss";

interface ToolbarInputProps {
    id : string;
    type? : React.HTMLInputTypeAttribute;
    value?: string;
    placeholder?: string;
    onChanged? : (value : string) => void;
}

const ToolbarInput : React.FC<ToolbarInputProps> = ({
    id, type, value, placeholder, onChanged,
}) : ReactElement => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => setInputValue(value), [value]);

    return (
        <div className={styles.toolbarInput}>
            <input type={type} id={id} name={id} value={inputValue} placeholder={placeholder}
                onChange={(e) : void => setInputValue(e.target.value)}
                onBlur={(e) : void => onChanged && onChanged(e.target.value)}
                onKeyDown={(e) : void => {
                    if (e.nativeEvent.key === "Escape" || e.nativeEvent.key === "Enter")
                        (e.target as HTMLInputElement).blur();
                }} />
            <label htmlFor={id}>{inputValue}</label>
        </div>
    );
};
ToolbarInput.defaultProps = {
    type: "text",
    value: "",
    placeholder: "",
    onChanged: undefined,
};
export default ToolbarInput;
