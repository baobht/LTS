import { Header } from '@/components';
import AuthForm from '@/components/lab/AuthForm/AuthForm';
import { Outlet } from 'react-router';

export default function MainLayout() {
	return (
		<div className="px-[50px] bg-white h-full overflow-auto">
			<Header />
			<Outlet />
			<AuthForm />
		</div>
	);
}
