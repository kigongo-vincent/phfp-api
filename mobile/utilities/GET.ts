import { constants } from "./constants"

import axios from 'axios'

export const GET = async (setLoading: any | undefined, setError: any | undefined, setData: any, path: string): Promise<void> => {

    setLoading(true)

    try {

        setData(null)

        const response = await axios.get(constants.API_LINK + path)

        if (response.status == 200 || response.status == 202) {

            const data = await response.data

            setData(data)

        }
    }

    catch (error) {

        setError(error)

    }

    finally {
        setLoading(false)
    }



}