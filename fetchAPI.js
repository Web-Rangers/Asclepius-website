/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

const fetchAPI =  async (method, url, body) => {
    console.log(method, url, body)
    // const [isLoading, setIsLoading] = useState(false);
    // const [apiData, setApiData] = useState('test');
    // const [serverError, setServerError] = useState(null);

    // useEffect(() => {
        // setIsLoading(true);
    try {
        const resp = await axios({
            method: method,
            url: url,
            data: body
        });
        const data = await resp?.data;

        return { data };

        // setApiData(data);
        // setIsLoading(false);
    } catch (error) {
        // setServerError(error);
        // setIsLoading(false);
    }
    // }, [url, method, body]);

    // return { data };
}

export default fetchAPI