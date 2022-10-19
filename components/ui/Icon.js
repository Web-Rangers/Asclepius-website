import Image from "next/image";
import styles from "../../styles/components/twilio/room.module.css";

const Icon = ({ color, icon, fn }) => {
    return <button onClick={() => fn()} className={styles.icon} style={{ background: `${color}` }}><Image alt="" src={icon} width={20} height={20} /></button>
}

export default Icon;