import styles from "../../styles/dropDown.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const language = [
  {
    id: "1",
    language: "Eng",
  },
  {
    id: "2",
    language: "Geo",
  },
  {
    id: "3",
    language: "Rus",
  },
];

export default function DropDown({
  items = language,
  onChange,
  defaultSelected,
  bordered = true,
  withHeader = true,
}) {
  const [current, setCurrent] = useState(items[0].language);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const selectItem = (item) => {
    setCurrent(item);
    onChange && onChange(item);
    setOpen(false);
  };

  const selectetArray = language.filter((item) => item.language !== current);

  const closeIfNotDropdown = (e) => {
    if (
      e.target != dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    )
      setOpen(false);
  };

  useEffect(() => {
    defaultSelected &&
      setCurrent(items.find((item) => item.id === defaultSelected));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (window) window.addEventListener("click", closeIfNotDropdown);
    return () => {
      window.removeEventListener("click", closeIfNotDropdown);
    };
  }, []);

  return (
    <div
      className={`${styles.container} ${!bordered && styles.noBorder}`}
      ref={dropdownRef}
    >
      <div
        className={styles.header}
        onClick={() => setOpen(!open)}
        style={
          open ? { borderRadius: "0px 0px 0px 0px" } : { borderRadius: "8px" }
        }
      >
        {withHeader && (
          <>
            <div className={styles.textInfo}>
              <span className={styles.selected}>{current || ""}</span>
            </div>
            {open ? (
              <Image layout="fill" alt="" src="/dropUp.svg" className={styles.icon} />
            ) : (
              <Image layout="fill" alt="" src="/dropDown.svg" className={styles.icon} />
            )}
          </>
        )}
      </div>
      <div
        className={styles.itemsContainer}
        style={
          open
            ? {
                height: "auto",
                border: "1px solid #4B445333",
                borderTop: "none",
              }
            : { height: "0px" }
        }
      >
        <div className={styles.itemsWrap}>
          {selectetArray.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => selectItem(item.language)}
            >
              <span className={styles.itemText}>{item.language}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
