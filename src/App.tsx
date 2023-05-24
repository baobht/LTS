import { Route, Routes } from 'react-router-dom';
import Home from '@/components/Home';
import { AddBroll, UserProfile } from './components';

function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/add-broll" element={<AddBroll />} />
				<Route path="/user-profile" element={<UserProfile />} />
			</Routes>
		</div>
	);
}

export default App;
