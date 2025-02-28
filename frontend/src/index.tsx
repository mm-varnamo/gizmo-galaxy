import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import OrderListPage from './pages/OrderListPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import UserListPage from './pages/UserListPage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomePage />} />
			<Route path='/product/:id' element={<ProductPage />} />
			<Route path='/cart' element={<CartPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />

			<Route path='' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingPage />} />
				<Route path='/payment' element={<PaymentPage />} />
				<Route path='/placeorder' element={<PlaceOrderPage />} />
				<Route path='/order/:id' element={<OrderPage />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Route>

			<Route path='' element={<AdminRoute />}>
				<Route path='/admin/orderlist' element={<OrderListPage />} />
				<Route path='/admin/productlist' element={<ProductListPage />} />
				<Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
				<Route path='/admin/userlist' element={<UserListPage />} />
			</Route>
		</Route>
	)
);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PayPalScriptProvider options={{ clientId: 'test' }} deferLoading={true}>
				<RouterProvider router={router} />
			</PayPalScriptProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
