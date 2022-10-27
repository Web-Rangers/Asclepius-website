import { useState } from "react";

<<<<<<< HEAD
const API_URL = `https://medical.pirveli.ge/medical/twilio/accessToken`
=======
const API_URL = `http://medical.pirveli.ge/medical/api/v1/twilio/accessToken`
>>>>>>> b30196e5c92ff55332f2a1c26d463c0c2d082131

const INITIAL_STATE = {
    isLoading: false,
    error: null,
    token: null,
    identity: null,
    roomName: null
}

export default function useConfig() {
    const [config, setConfig] = useState(INITIAL_STATE)

    const getToken = ({ identity, roomName }) => {
        if(identity && roomName) {
            setConfig({ ...INITIAL_STATE, isLoading: true })
            fetch(`${API_URL}?identity=${identity}&room=${roomName}`)
                .then(res => res.json())
                .then(result => {
                    if(result.token) {
                        setConfig({
                            isLoading: false,
                            token: result.token,
                            identity,
                            roomName
                        })
                    }
                })
                .catch(error => {
                    console.log(`Error: ${error.message}`)
                    setConfig(c => ({ ...c, isLoading: false, error }))
                })
        }
    }

    return {
        ...config,
        getToken
    }
}