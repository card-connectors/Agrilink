import React, { useContext } from 'react'
import { AuthContext } from '../ContextFiles/AllContext'


function Authcheck() {

    const {sample} = useContext(AuthContext)

  return (
    <div>Authcheck
 
 <p>{sample}</p>
    </div>
  )
}

export default Authcheck