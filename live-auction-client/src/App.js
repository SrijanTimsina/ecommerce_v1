import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Ad from "./components/Ad";
import AdForm from "./components/AdForm";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductScreen from "./screens/ProductScreen";

//Admin
import OrderListScreen from "./screens/admin/OrderListScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
// Actions
import { loadUser } from "./actions/auth";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import AdminRoute from "./components/AdminRoute";
import Orders from "./components/Orders";

function App() {
	// Load user
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/ads/:adId" element={<Ad />} />
					<Route path="/postad" element={<AdForm />} />
					<Route path="/dashboard" element={<Dashboard />} />

					<Route path="/product/:id" element={<ProductScreen />} />
					<Route path="/shipping" element={<ShippingScreen />} />
					<Route path="/payment" element={<PaymentScreen />} />
					<Route path="/placeorder" element={<PlaceOrderScreen />} />
					<Route path="/order/:id" element={<OrderScreen />} />
					<Route path="/cart" element={<CartScreen />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="" element={<AdminRoute />}>
						<Route
							path="/admin/orderlist"
							element={<OrderListScreen />}
						/>
						<Route
							path="/admin/productlist"
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/product/:id/edit"
							element={<ProductEditScreen />}
						/>
						<Route
							path="/admin/userlist"
							element={<UserListScreen />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
