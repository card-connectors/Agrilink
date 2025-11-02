import React, { useState } from 'react'
import { EntityContext } from './AllContext';

function EntityProvider({children}) {
    const [landId, setLandId] = useState("");
    const [farmerId, setFarmerId] = useState("");
    const [productId, setProductId] = useState("");
    const [orderQuantity, setOrderQuantity] = useState("")
  return (
    <EntityContext.Provider value={{landId,setLandId, farmerId, setFarmerId, productId, setProductId, orderQuantity, setOrderQuantity}}>
        {children}
    </EntityContext.Provider>
  )
}

export default EntityProvider