import AudioTrack from "./AudioTrack"
import VideoTrack from "./VideoTrack"
import { useTrack } from "use-twilio-video"
import UserInfo from "../ui/UserInfo"

function Participant({ toggleMicrophone, isMicrophoneOn, participant, type }) {
    const { videoOn, audioOn, videoTrack, audioTrack } = useTrack({ participant })

    return (
        <>
            {videoOn ? <> <VideoTrack track={videoTrack} /> <UserInfo toggleMicrophone={toggleMicrophone} isMicrophoneOn={isMicrophoneOn} name={participant} /> </> : 'video off'}
            <br />
            {audioOn ? <AudioTrack track={audioTrack} /> : ""}
        </>
    )
}

export default Participant