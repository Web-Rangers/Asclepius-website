import Icon from "./Icon";
import styles from "../../styles/components/twilio/room.module.css";

const UserInfo = ({ name, isMicrophoneOn, toggleMicrophone }) => {
    return (
        <>
            <div className={styles.userinfo}>
                <Icon fn={toggleMicrophone} color={isMicrophoneOn ? '#9CA3AC' : '#FF5954'} icon={isMicrophoneOn ? '/sound-on.svg' : '/mute.svg'} />
                <h3 className={styles.username}>{JSON.stringify(name?.identity)}</h3>
            </div>
        </>
    )
}

export default UserInfo;