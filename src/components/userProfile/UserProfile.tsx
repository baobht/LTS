import { Button } from '@mui/material';
import { useId } from 'react';

const UserProfile = () => {
	const renderId = useId();
	return (
		<section className="bg-white w-screen h-screen px-[50px] pb-11">
			<div className="flex items-center justify-between mb-20">
				<h2 className="text-black font-bold text-3xl">Profile</h2>
				<Button
					sx={{
						outline: 'none !important',
						textTransform: 'capitalize',
					}}
					variant="contained"
				>
					New Project
				</Button>
			</div>

			<div className="flex flex-wrap justify-between">
				<div className="w-full xl:w-1/4 pl-11 mb-8">
					<div className="relative w-fit">
						<img
							src="https://hanoitop10.com/wp-content/uploads/2023/01/anh-jennie-blackpink-dep_1.jpg"
							alt="user_avatar"
							draggable={false}
							className="w-32 h-32 rounded-full object-cover"
						/>
						<label
							htmlFor={renderId}
							className="absolute bottom-0 right-2 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center p-1 bg-white"
						>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M7.87646 6.55273H17.6265C19.7332 6.55273 20.7865 6.55273 21.5432 7.05832C21.8708 7.2772 22.152 7.55845 22.3709 7.88602C22.8126 8.54703 22.8684 9.43447 22.8755 11.0527M12.8765 6.55273L12.2431 5.28586C11.7183 4.23631 11.2387 3.17985 10.0757 2.74374C9.56636 2.55273 8.98449 2.55273 7.82073 2.55273C6.00426 2.55273 5.09602 2.55273 4.41452 2.93305C3.92873 3.20415 3.52788 3.605 3.25678 4.09079C2.87646 4.77229 2.87646 5.68053 2.87646 7.497V10.5527C2.87646 15.2667 2.87646 17.6238 4.34093 19.0882C5.64106 20.3884 7.64466 20.5343 11.3765 20.5506H11.8765"
									stroke="#879BAC"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
								<path
									d="M21.5422 16.6939L18.2344 20.0017L19.295 21.0624L22.6029 17.7545L21.5422 16.6939ZM16.4274 18.1947L19.7352 14.8869L18.6746 13.8262L15.3667 17.1341L16.4274 18.1947ZM16.0673 20.675C15.8919 20.7125 15.7517 20.7424 15.6312 20.7648C15.5097 20.7874 15.43 20.7981 15.376 20.8015C15.3205 20.8051 15.3243 20.7985 15.3589 20.8074C15.406 20.8196 15.47 20.8499 15.5246 20.9045L14.464 21.9651C14.7877 22.2889 15.1922 22.3163 15.4712 22.2985C15.7367 22.2816 16.0603 22.2104 16.3809 22.1418L16.0673 20.675ZM14.2873 20.0482C14.2187 20.3688 14.1475 20.6924 14.1306 20.9579C14.1128 21.2369 14.1402 21.6414 14.464 21.9651L15.5246 20.9045C15.5792 20.9591 15.6095 21.0231 15.6217 21.0702C15.6306 21.1048 15.624 21.1086 15.6276 21.0531C15.631 20.9991 15.6417 20.9194 15.6643 20.7979C15.6867 20.6774 15.7166 20.5372 15.7541 20.3618L14.2873 20.0482ZM21.5422 14.8869C21.9097 15.2544 21.9848 15.3387 22.0231 15.405L23.3222 14.655C23.1603 14.3745 22.9021 14.1255 22.6029 13.8262L21.5422 14.8869ZM22.6029 17.7545C22.9021 17.4553 23.1603 17.2062 23.3222 16.9258L22.0231 16.1758C21.9848 16.2421 21.9097 16.3264 21.5422 16.6939L22.6029 17.7545ZM22.0231 15.405C22.1608 15.6435 22.1608 15.9373 22.0231 16.1758L23.3222 16.9258C23.7278 16.2232 23.7278 15.3576 23.3222 14.655L22.0231 15.405ZM22.6029 13.8262C22.3036 13.527 22.0546 13.2688 21.7741 13.1069L21.0241 14.406C21.0904 14.4443 21.1747 14.5194 21.5422 14.8869L22.6029 13.8262ZM19.7352 14.8869C20.1027 14.5194 20.187 14.4443 20.2533 14.406L19.5033 13.1069C19.2229 13.2688 18.9738 13.527 18.6746 13.8262L19.7352 14.8869ZM21.7741 13.1069C21.0715 12.7013 20.2059 12.7013 19.5033 13.1069L20.2533 14.406C20.4918 14.2683 20.7856 14.2683 21.0241 14.406L21.7741 13.1069ZM18.2344 20.0017C18.0388 20.1972 17.7716 20.3237 17.3919 20.4206C17.2017 20.4692 16.9988 20.5067 16.7727 20.5458C16.5554 20.5833 16.3067 20.6238 16.0673 20.675L16.3809 22.1418C16.5827 22.0987 16.7895 22.0651 17.0281 22.0239C17.2578 21.9842 17.511 21.9383 17.763 21.874C18.2678 21.7451 18.8297 21.5277 19.295 21.0624L18.2344 20.0017ZM15.7541 20.3618C15.8053 20.1224 15.8458 19.8737 15.8833 19.6564C15.9224 19.4303 15.9599 19.2274 16.0085 19.0372C16.1054 18.6575 16.2319 18.3903 16.4274 18.1947L15.3667 17.1341C14.9014 17.5994 14.684 18.1613 14.5551 18.6661C14.4908 18.9181 14.4449 19.1713 14.4052 19.401C14.364 19.6396 14.3304 19.8464 14.2873 20.0482L15.7541 20.3618Z"
									fill="#879BAC"
								/>
							</svg>
						</label>
						<input id={renderId} type="file" className="hidden" accept="image/*" />
					</div>
				</div>
				<div className="w-full xl:w-3/4">
					<div className="">
						<h3 className="font-bold text-black text-[27px] mb-7">Personal Information</h3>
						<div className="grid grid-cols-3 text-black  border-b border-[#EBEBEB] gap-y-2.5 pb-8">
							<p className="text-[#879BAC] text-lg">First Name</p>
							<p className="text-[#879BAC] text-lg">Last Name</p>
							<p className="text-[#879BAC] text-lg">Email</p>
							<p className="text-2xl">Sophia</p>
							<p className="text-2xl">Jakib</p>
							<p className="text-[#879BAC] text-lg">sophiajakib19@gmail.com</p>
						</div>
					</div>

					<div className="pt-10 ">
						<h3 className="font-bold text-black text-[27px] mb-8">Sign In Methods</h3>
						<div className="grid grid-cols-3 text-black border-b border-[#EBEBEB] gap-y-2.5 pb-8">
							<p className="text-2xl">Google</p>
							<div></div>
							<p className="text-[#879BAC] ext-2xl"></p>
							<p className="text-2xl">Password</p>
							<div></div>
							<p className="text-[#879BAC] text-2xl">Setup</p>
						</div>
					</div>

					<div className="pt-10 pb-11">
						<h3 className="font-bold text-black text-[27px] mb-8">Billing details</h3>
						<div className="grid grid-cols-3 text-black gap-y-2.5">
							<p className="text-2xl">Credit Card</p>
							<div></div>
							<p className="text-[#879BAC] text-2xl">Edit</p>
							<p className="text-2xl">Billing Info</p>
							<div></div>
							<p className="text-[#879BAC] text-2xl">Setup</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default UserProfile;
