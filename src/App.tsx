import { Route, Routes } from 'react-router-dom';
import Home from '@/components/Home';
import { AddBroll } from './components';

function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/add-broll" element={<AddBroll />} />
			</Routes>
		</div>
	);
}

export default App;
