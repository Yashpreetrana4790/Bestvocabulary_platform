"use server"

export const Getalluser = async () => {
  const response = await fetch("http://localhost:8000/api/v1/user/allusers", { next: { revalidate: 3600 } })
  const data = await response.json()
  return data
}