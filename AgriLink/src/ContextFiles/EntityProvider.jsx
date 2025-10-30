import React, { useState } from 'react'
import { EntityContext } from './AllContext';

function LandProvider(children) {
    const [landId, setLandId] = useState("");
    const [farmerId, setFarmerId] = useState("");
    const [productId, setProductId] = useState("");
  return (
    <EntityContext.Provider value={{landId,setLandId, farmerId, setFarmerId, productId, setProductId}}>
        {children}
    </EntityContext.Provider>
  )
}

export default LandProvider