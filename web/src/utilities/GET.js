import { constants } from './constants'

export const GET = async (setLoading, path, setData, setError) => {

    const response = await fetch(`${constants.URL}/${path}`)

    if (response.status == 200) {
        const data = await response.json()
        setData(data)
        setLoading(false)
    }

    else {
        setLoading(false)
        setError(true)
    }

}