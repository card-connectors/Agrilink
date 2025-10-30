
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Landowners from "./pages/Landowners";
import Farmers from "./pages/Farmers";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Footer from "./component/Footer";
import { useState } from "react";
import YourOrders from "./component/YourOrders";
import ReceivedRequests from "./component/ReceivedRequests";
import SentRequest from "./component/SentRequest";
import LandDetails from "./component/LandDetails";
import FarmerDetails from "./component/FarmerDetails";
import OrdersReceived from "./component/OrdersReceived";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./component/ProfileSetup";
import AddLand from "./component/AddLand";
import AddFarming from "./component/AddFarming";
import AddProducts from "./component/AddProducts";
import ProductDetails from "./component/ProductDetails";
import ManageLand from "./component/ManageLand";
import ManageFarming from "./component/ManageFarming";
import ManageProducts from "./component/ManageProducts";
import PlaceOrder from "./component/PlaceOrder";
import EntityProvider from "./ContextFiles/EntityProvider";


function App() {
  const [showLogin, setShowLogin] = useState(false);
  // Function to open login modal
  const openLogin = () => {
    console.log("Opening login modal"); // Debug
    setShowLogin(true);
  };

  // Function to close login modal
  const closeLogin = () => {
    console.log("Closing login modal"); // Debug
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLoginClick={openLogin} />
      {/* Navbar visible on all pages */}
      {/* Main content area */}

      {/* <DeliveryPerson/> */}

      <main className="container mx-auto px-4 py-8">
        <EntityProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landowners" element={<Landowners />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/orders-received' element={<OrdersReceived />} />
            <Route path='/sent-requests' element={<SentRequest />} />
            <Route path='/received-requests' element={<ReceivedRequests />} />
            <Route path='/your-orders' element={<YourOrders />} />
            <Route path="/landdetails" element={<LandDetails />} />
            <Route path="/farmersdetails" element={<FarmerDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profileSetup" element={<ProfileSetup />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/add-land" element={<AddLand />} />
            <Route path="/add-farming" element={<AddFarming />} />
            <Route path="/add-product" element={<AddProducts />} />
            <Route path="/manage-land" element={<ManageLand />} />
            <Route path="/manage-farming" element={<ManageFarming />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Routes>

        </EntityProvider>
      </main>
      {showLogin && <Login onClose={closeLogin} />}
      <Footer />
    </div >
  );
}

export default App;
