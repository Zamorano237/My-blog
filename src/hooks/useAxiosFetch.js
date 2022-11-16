import axios from "axios";
import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from 'easy-peasy'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([])

    const fetchError = useStoreState((state) => state.fetchError)
    const isLoading = useStoreState((state) => state.isLoading)
    const setIsLoading = useStoreActions((actions) => actions.setIsLoading)
    const setFetchError = useStoreActions((actions) => actions.setFetchError)

    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source()
        
        const fetchData = async (url) =>{
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })

                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (err) {
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }
            } finally{
               if (isMounted) setTimeout(() => setIsLoading(false), 2000)
            }
        }

        fetchData(dataUrl)

        const cleanUp = () => {
            isMounted = false
            source.cancel()
        }

        return cleanUp
    }, [dataUrl, setFetchError, setIsLoading])
    return {data, fetchError, isLoading}
}

export default useAxiosFetch