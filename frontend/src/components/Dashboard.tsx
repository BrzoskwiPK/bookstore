import { useAuthUser } from "react-auth-kit"

const Dashboard = () => {
  const authData = useAuthUser()

  return (
    <div>Oh henlo {authData()?.username}</div>
  )
}

export default Dashboard