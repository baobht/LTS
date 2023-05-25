import Logo from '@/assets/imgs/icons/logo.svg';
import { EPages } from '@/constants/pages';
import { Link, NavLink } from 'react-router-dom';
export default function Header() {
	const isLogged = false;
	const renderRightSideHeader = () => {
		if (isLogged) {
			return 1;
		}
		return (
			<>
				<NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={EPages.HOME}>
					Home
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={EPages.HOME}>
					Blog
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={EPages.PRICING}>
					Pricing
				</NavLink>
				<NavLink className={({ isActive }) => (isActive ? 'text-primary' : '')} to={EPages.HOME}>
					Join
				</NavLink>
			</>
		);
	};
	return (
		<div className="grid grid-cols-3 text-black pt-9 items-center">
			<Link to={EPages.HOME}>
				<img src={Logo} alt="Rollify Logo" />
			</Link>
			<div className="text-center"></div>
			<div className="justify-end flex gap-14">{renderRightSideHeader()}</div>
		</div>
	);
}
