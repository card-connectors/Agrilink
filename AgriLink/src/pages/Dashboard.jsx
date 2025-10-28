import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../ContextFiles/AllContext';
import DeliveryPerson from '../component/DeliveryPerson';
import UserDashboard from './UserDashboard';

function Dashboard() {
  const { userId } = useContext(AuthContext); // userId is user's email
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/api/auth/get-role/?email=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.userType) {
            console.log(data.userType)
            setUserRole(data.userType);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRole) {
    // You could redirect to login or show an error here instead
    return <div>User role not found.</div>;
  }

  return (
    <>
      {userRole === "Customer" ? <UserDashboard /> : <DeliveryPerson />}
    </>
  );
}

export default Dashboard;
