import classNames from "classnames";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import styles from "../styles/components/inputs.module.css";

export default function Select({
  options,
  onChange,
  label,
  value,
  className,
  style,
  inputStyle,
  labelStyle = "inside",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    options.find((option) => option.value === value)
  );

  useEffect(() => {
    setSelected(options.find((option) => option.value === value));
  }, [value]);

  return (
    <div className={classNames(styles.container, className)}>
      {labelStyle === "outside" && (
        <div className={styles.label}>
          <span>{label}</span>
        </div>
      )}
      <div className={classNames(style ? style : styles.select)}>
        <div
          className={inputStyle ? inputStyle : styles.body}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className={classNames(styles.label, {
              [styles.selectedLabel]: value,
            })}
          >
            <span>{selected?.label || (labelStyle === "inside" && label)}</span>
          </div>
          <ReactSVG
            src={"/selectArrow.svg"}
            className={classNames(styles.arrow, { [styles.up]: isOpen })}
          />
        </div>
        <div
          className={classNames(styles.wrapper, { [styles.active]: isOpen })}
        >
          {options.map((option, i) => (
            <div
              key={i}
              className={classNames(styles.option, {
                [styles.active]: option === selected,
              })}
              onClick={() => {
                onChange(option.value);
                setSelected(option);
                setIsOpen(!isOpen);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
