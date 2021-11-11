import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
}
    const request = useCallback( async (url, methood = 'GET', body = null, headers ={}) => {
        setLoading(true)
        try {
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response) {
                throw new Error(data.message || 'Something wrong')
            }
            
            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => setError(null)

    return { loading, request, error }
}