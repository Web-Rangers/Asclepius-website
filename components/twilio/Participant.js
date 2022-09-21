import AudioTrack from "./AudioTrack"
import VideoTrack from "./VideoTrack"
import { useTrack } from "use-twilio-video"

function Participant ({ participant }) {
    const { videoOn, audioOn, videoTrack, audioTrack } = useTrack({ participant })

    return (
        <>
            {videoOn ? <VideoTrack track={videoTrack} /> : 'video off'}
            <br />
            {audioOn ? <AudioTrack track={audioTrack} /> : "audio off"}
        </>
    )
}

export default Participant