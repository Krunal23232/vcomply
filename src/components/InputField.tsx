import React, { FC} from "react";
import styles from '../styles/components/inputFiled.module.scss';
import { InputProps } from "../interface/interface";



const InputField: FC<InputProps> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onBlur,
  onChange,
  error,
  touched,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      {type !== "textarea"  && (
        <input
          className={styles.input}
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={styles.input}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      {error && touched && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
};

export default InputField;
