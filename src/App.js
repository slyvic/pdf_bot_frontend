import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import BotPage from './pages/main/BotPage';

function App() {
	const token = localStorage.getItem("token");
	if (token) {
		return (
			<div className="wrapper">
				<BrowserRouter>
				<Routes>
					<Route path="/" element={<BotPage />} />
					<Route path="/auth" element={<LoginPage />} />
				</Routes>
				</BrowserRouter>
			</div>
		);
	} else {
		return <LoginPage />
	}
}

export default App;
