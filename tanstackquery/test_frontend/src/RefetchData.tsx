import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const RefetchData = () => {
    const queryClient = useQueryClient();
    const randomJokesQueryOptions = () => queryOptions({
        queryKey: ["jokes"],
        queryFn: async () => {
            const url = 'https://api.freeapi.app/api/v1/public/randomjokes/joke/random';
            const options = { method: 'GET', headers: { accept: 'application/json' } };
            const response = await fetch(url, options);
            const data = await response.json();
            return data?.data || data;
        },
        refetchInterval: 10000
    })

    const {data} = useQuery(randomJokesQueryOptions())

    // queryClient.prefetchQuery(randomJokesQueryOptions()) for prefetching an query for immersion faster loading
    console.log(data)
    return (
        <div className="joke-card">
      <p className="joke-punchline">{data?.content}</p>
    </div>
    )
}

export default RefetchData
