import { constants } from './constants'

export const PATCH_FORMDATA = async (setLoading, path, formData, setError) => {
    setLoading(true)
    let data, status
    try {
        const response = await fetch(`${constants.URL}/${path}/`, {
            method: "PATCH",
            body: formData
        })
        if(response.status == 202){
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

export const PATCH_RAWDATA = async (setLoading, path, rawData, setError) => {
    setLoading(true)
    let data, status
    try {
        const response = await fetch(`${constants.URL}/${path}/`, {
            method: "PATCH",
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