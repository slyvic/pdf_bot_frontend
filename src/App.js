import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MainPage from "./pages/main";

function App() {
	const token = localStorage.getItem("token");

	if (token) {
		return (
			<div className="wrapper">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/auth" element={<LoginPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	} else {
		return <LoginPage />;
	}
}

export default App;
