import { useEffect } from "react"
import Participant from "./Participant"
import { useRoom } from "use-twilio-video"
import Icon from "../ui/Icon";
import styles from "../../styles/components/twilio/room.module.css";
// import { Button } from "components";
// import classNames from "classnames";

function Room({ token, identity, roomName, onDisconnected }) {
    const {
        room,
        error,
        connectRoom,
        disconnectRoom,
        localParticipant,
        remoteParticipants,
        dominantSpeaker,
        isCameraOn,
        toggleCamera,
        isMicrophoneOn,
        toggleMicrophone
      } = useRoom()

      useEffect(() => {
        if(!room && token && roomName) {
            connectRoom({ token, options: { name: roomName, dominantSpeaker: true } })
            return () => disconnectRoom()
        }
      }, [connectRoom, disconnectRoom, room, roomName, token])

      if(error) return `Error: ${error.message}`

      if(room) 
        return (
            // <div>
            //     <div>
            //     Local participant: {JSON.stringify(localParticipant?.identity)}
            //     </div>
            //         <Participant participant={localParticipant} />
            //     <div>
            //         Remote participants:{' '}
            //         {JSON.stringify(remoteParticipants.map(v => v.identity))}
            //     </div>
            //     <div>Dominant speaker: {JSON.stringify(dominantSpeaker?.identity)}</div>
            //     <div>
            //         {remoteParticipants.map((p, i) => (
            //             <Participant key={i} participant={p} />
            //         ))}
            //     </div>
                

            //     <div>
            //         <button
            //             onClick={() => {
            //                 disconnectRoom()
            //                 onDisconnected && onDisconnected()
            //             }}
            //         >
            //             disconnect
            //         </button>
            //         <button onClick={() => toggleCamera()}>
            //             {isCameraOn ? 'turn off camera' : 'turn on camera'}
            //         </button>
            //         <button onClick={() => toggleMicrophone()}>
            //             {isMicrophoneOn ? 'turn off mic' : 'turn on mic'}
            //         </button>
            //     </div>
            // </div>

            <section className={styles.container}>
                <header>
                    <blockquote className={styles.flex}>
                        <Icon color="#F7F9FB" icon="/Arrow - Left.svg" />
                        <Icon color="#77C479" icon="/video-white.svg" />
                        <h2 className={styles.title}>Video call with {JSON.stringify(localParticipant?.identity)}</h2>
                    </blockquote>

                    <blockquote>
                        <span>01:22:27</span>
                    </blockquote>
                </header>

                <section className={styles.wrapper}>
                    <article>
                        <blockquote className={styles.video}>
                            <Participant type="big" toggleMicrophone={toggleMicrophone} isMicrophoneOn={isMicrophoneOn} participant={localParticipant} /> 
                        </blockquote>
                        <footer>
                            {/* <blockquote>

                            </blockquote> */}

                            <blockquote className={styles.flex}>
                                <Icon fn={toggleMicrophone} color={isMicrophoneOn ? '#9CA3AC' : '#FF5954'} icon={isMicrophoneOn ? '/sound-on.svg' : '/mute.svg'} />
                                <Icon fn={toggleCamera} color={isCameraOn ? '#F7F9FB' : '#FF5954'} icon={isCameraOn ? '/video-black.svg' : '/video-white.svg'} />
                            </blockquote>

                            <blockquote>
                                <button
                                    className={styles.leave}
                                    onClick={() => {
                                        disconnectRoom()
                                        onDisconnected && onDisconnected()
                                    }}
                                >
                                    Leave meet
                                </button>
                            </blockquote>
                        </footer>
                    </article>

                    <aside>
                        {remoteParticipants.map((p, i) => (
                            <Participant toggleMicrophone={toggleMicrophone} isMicrophoneOn={isMicrophoneOn} type="small" key={i} participant={p} />
                        ))}
                    </aside>
                </section>
            </section>
        )

        return 'connectiong...'
}

export default Room