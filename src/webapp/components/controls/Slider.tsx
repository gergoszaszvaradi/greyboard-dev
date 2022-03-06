import React, { ReactElement, useState } from "react";
import Id from "../../../common/utils/id";

import styles from "./Slider.module.scss";

interface SliderProps {
    label?: string;
    min: number;
    max: number;
    step: number;
    startValue: number;
    showValue?: boolean;
    onInput?: (value: number) => void;
}

const Slider : React.FC<SliderProps> = ({
    label, min, max, step, startValue, showValue, onInput,
}) : ReactElement => {
    const [value, setValue] = useState(startValue);
    const id = new Id();

    return (
        <div className={styles.slider}>
            {label && <label htmlFor={id.toString()}>{label}</label>}
            <div className={styles.input}>
                <input type="range" id={id.toString()} min={min} max={max} step={step} value={value} onInput={(e) : void => {
                    const v = parseFloat((e.target as HTMLInputElement).value);
                    setValue(v);
                    if (onInput)
                        onInput(v);
                }} />
                {showValue && <small className={styles.value}>{value}</small>}
            </div>
        </div>
    );
};
Slider.defaultProps = {
    label: undefined,
    showValue: false,
    onInput: undefined,
};
export default Slider;
