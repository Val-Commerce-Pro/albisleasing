import type { ChangeEvent } from "react";
import { Label } from "../label";
import styles from "./styles.module.css";

type SwitchProps = {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checkboxValue?: boolean;
  name: string;
  label?: string;
};

export const Switch = ({
  handleOnChange,
  checkboxValue,
  label,
  name,
}: SwitchProps) => {
  return (
    <div className={styles.switchContainer}>
      {label && <Label label={label} />}
      <div className={styles.toggleSwitch}>
        <span className={styles.toggleTextOff}>Off</span>
        <input
          type="checkbox"
          name={name}
          id={`toggle-${name}`}
          className={styles.toggleCheckbox}
          onChange={(e) => handleOnChange(e)}
          checked={checkboxValue}
        />
        <label className={styles.toggleLabel} htmlFor={`toggle-${name}`}>
          <span className={styles.toggleInner}></span>
          <span className={styles.toggleSwitch}></span>
        </label>
        <span className={styles.toggleTextOn}>On</span>
      </div>
    </div>
  );
};
