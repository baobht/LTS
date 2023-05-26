import Home from '@/components/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { NewProject, Pricing, ProjectManagement, Rollify, Support, UserProfile } from './components';
import { EPages } from './constants/pages';
import MainLayout from './layout/MainLayout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			notifyOnChangeProps: ['data'],
		},
	},
});
function App() {
	return (
		<div id="app">
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route element={<MainLayout />}>
						<Route path={EPages.HOME} element={<Home />} />
						<Route path={EPages.ADD_PROJECT} element={<Rollify />} />
						<Route path={EPages.UPDATE_PROJECT} element={<Rollify />} />
						<Route path={EPages.USER_PROFILE} element={<UserProfile />} />
						<Route path={EPages.PROJECT_MANAGEMENT} element={<ProjectManagement />} />
						<Route path={EPages.NEW_PROJECT} element={<NewProject />} />
						<Route path={EPages.PRICING} element={<Pricing />} />
						<Route path={EPages.SUPPORT} element={<Support />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</div>
	);
}

export default App;
