import { useEffect, useState } from "react"

const fetchTangina = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(autoFetch)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)

            const result = await fetchFunction()

            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An error occurred"))
        } finally {
            setLoading(false)
        }


    }

    const reseet = () => {
        setData(null)
        setLoading(false)
        setError(null)
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [])

    return { data, loading, error, refetch: fetchData, reseet }
}

export default fetchTangina