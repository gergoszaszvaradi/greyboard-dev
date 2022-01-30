import React, { ReactElement, useEffect, useState } from "react";

import "./ToolbarInput.scss";

interface ToolbarInputProps {
    id : string,
    type? : React.HTMLInputTypeAttribute,
    value?: string,
    placeholder?: string,
    onChanged? : React.ChangeEventHandler,
}

const ToolbarInput : React.FC<ToolbarInputProps> = ({
    id, type, value, placeholder, onChanged,
}) : ReactElement => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => setInputValue(value), [value]);

    return (
        <div className="toolbar-input">
            <input type={type} id={id} name={id} value={inputValue} placeholder={placeholder} onChange={(e) => { setInputValue(e.target.value); if (onChanged) onChanged(e); }} />
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