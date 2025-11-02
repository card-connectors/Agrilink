import React, { useContext } from 'react'
import { AuthContext } from '../ContextFiles/AllContext'
import DeliveryPerson from '../component/DeliveryPerson';
import UserDashboard from './UserDashboard';

function Dashboard() {

  const {userId} = useContext(AuthContext); // user email

  let userRole = "Customer";



  return (
    <>
    {userRole == "Customer"?  <UserDashboard/> : <DeliveryPerson/> 

    }
    </>
  )
}

export default Dashboard
