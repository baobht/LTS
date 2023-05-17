import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/Home";

function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/home" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
