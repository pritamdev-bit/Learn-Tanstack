import { queryOptions, useQuery } from '@tanstack/react-query'
import './App.css'
import { useState } from 'react'

function Componented() {
  const [showData, setShowData] = useState(true);
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
  const { data, isPending, isError, error } = useQuery(createQueryOption())
  return (
    <>
      {isPending && <h1>Ruk ja bhai mal araha hai</h1>}
      {isError && <h1>{error.message}</h1>}
      { showData &&
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
          {data?.users?.map((user: any, index: number) => (
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
    </>
  )
}

export default Componented
