import { useState, useEffect } from "react";
import sanityClient from "@sanity/client"

const client = sanityClient({
    projectId: 'uz9llh6i',
    dataset: 'production',
    token: 'sknaiVJYpDaY1rnAh8IxRwuQ7l21kQGZTr05sihcDeDX2nR1u3Gw6vzWSKVsoX9km530Ix7ODSenrXJYqDceX4Flx7AO0lpNun7XzBUGwE0DXfcJSgx2ISSFQXZiwpvG4jEWlw8mLXbih2WF2Uy8VMQ8pnaUJvHfGzfc2EgYj9JxiJTEhNq2',
    useCdn: true,
})

const useSanityQuery = (query, liveQuery) => {
    const [data, setData] = useState({ data: undefined, loading: true, listener: undefined });

    useEffect(() => {
        client.fetch(query).then(result => {
          //  window.setTimeout(() => {
            setData({ data: result, loading: false });
        //}, 5000)
        });

        if (liveQuery) {
            client.listen(query).subscribe(result => {
                setData({ data: data, loading: false, listener: result });
            });        
        }
    }, [query])

    return [data.data, data.loading, data.listener];
}

export default useSanityQuery;