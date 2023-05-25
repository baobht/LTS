/* eslint-disable @typescript-eslint/no-empty-function */
import { Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

const Home = () => {
	const queryClient = useQueryClient();

	return (
		<div className="p-4 flex flex-col items-center gap-4 text-black">
			{/* <GooglePhotosAuth /> */}
			<div className="flex flex-col items-center justify-center h-[calc(100vh-101px)] max-w-[893px] text-center">
				<h1 className="mb-10 text-black font-bold text-5xl  ">
					Make more engaging videos faster with b-roll automation ⚡️
				</h1>
				<div className="text-[#929292] px-16 font-medium text-xl mb-[120px]">
					Rollify.io helps you easily find and add b-roll to your videos, saving you hours of editing and thousands of
					dollars in editor cost.
				</div>
				<Button
					onClick={() => {
						queryClient.setQueryData(['openAuth'], true);
					}}
					sx={{
						textTransform: 'none',
						background: '#4285F4',
						fontFamily: 'Roboto',
						fontWeight: 500,
						fontSize: '24px',
						lineHeight: '28px',
						padding: '26px 80px',
						borderRadius: '16px',
						outline: 'none !important',
					}}
					variant="contained"
				>
					Try for free
				</Button>
			</div>
		</div>
	);
};

export default Home;
