import { infiniteQueryOptions, queryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import './App.css'

type Options = {
  page: number | string,
  limit?: number | string
}

function Componented() {
  const fetchUsers = async (options: Options) => {
    const { page } = options ? options : {};
    const queryParams = new URLSearchParams();
    if (page) {
      queryParams.append('page', page.toString())
    }
    const queryString = queryParams.toString();
    const response = await fetch(`http://localhost:4000/getusers${queryString ? `?${queryString}` : ""}`);
    const data = response.json()
    return data;
  }
  const createQueryOption = () => {
    return (
      queryOptions({
        queryKey: ['users'],
        queryFn: async () => {
          const response = await fetch("http://localhost:4000/getusers");
          const data = await response.json();
          return data.users;
        },
        staleTime: 30000
      })
    )
  }

  const createPaginationQueryOption = () => {
    return (
      infiniteQueryOptions({
        queryKey: ['users'],
        queryFn: ({ pageParam }) => fetchUsers({ page: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastpage) => {
          return (lastpage.totalPages / 10) >= lastpage.currentPage ?  lastpage.currentPage + 1 : undefined;
        }
      })
    )
  }
  // const { data, isPending, isError, error } = useQuery(createQueryOption())
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isPending, isError, error } = useInfiniteQuery(createPaginationQueryOption())
  console.log(data);

  const allUsers = data?.pages.flatMap((page) => page.users)
  console.log(allUsers)
  return (
    <>
      {isPending && <h1>Ruk ja bhai mal araha hai</h1>}
      {isError && <h1>{error.message}</h1>}
      {
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {allUsers?.map((user: any, index: number) => (
            <div className="user-card" key={index}>
              <h2 className="user-name">{user.name}</h2>

              <div className="user-info">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Age:</strong> {user.age}</p>
              </div>
            </div>
          ))}
        </div>
      }

      <button
        style={{ display: "flex", justifyContent: "center", width: "50%", margin: "2vh auto", padding: "1rem", borderRadius: "5px", backgroundColor: "blue", color: "white", opacity: "0.6", cursor: "pointer" }}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}  
      >
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>
    </>
  )
}

export default Componented
