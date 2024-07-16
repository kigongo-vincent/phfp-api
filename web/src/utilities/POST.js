import { constants } from './constants'

export const POST_FORMDATA = async (setLoading, path, formData, setError) => {
    setLoading(true)
    let data, status
    try {
        const response = await fetch(`${constants.URL}/${path}/`, {
            method: "POST",
            body: formData
        })

        console.warn("ran")
        if(response.status == 201){
            data = await response.json()
        }
        else{
            setError(true)
        }
        status = response.status

    }
    catch (error) {
        setError(true)
    }

    finally {
        setLoading(false)
        return {
            status:status,
            data: data
        }
    }
}

export const POST_RAWDATA = async (setLoading, path, rawData, setError) => {
    setLoading(true)
    let data, status
    try {
        const response = await fetch(`${constants.URL}/${path}/`, {
            method: "POST",
            body: JSON.stringify(rawData),
            headers:{
                'Content-type': 'application/json'
            }
        })

        data = await response.json()
        
        status = response.status
    }
    catch (error) {
        setError(error)
    }

    finally {
        setLoading(false)
        return {
            status: status,
            data: data
        }
    }
}