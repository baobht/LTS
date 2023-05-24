import { Route, Routes } from 'react-router-dom';
import Home from '@/components/Home';
import { AddBroll, ProjectManagement, UserProfile } from './components';

function App() {
	return (
		<div id="app">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/add-broll" element={<AddBroll />} />
				<Route path="/user-profile" element={<UserProfile />} />
				<Route path="/project-management" element={<ProjectManagement />} />
			</Routes>
		</div>
	);
}

export default App;
