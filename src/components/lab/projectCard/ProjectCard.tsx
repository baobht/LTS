import { useRef, useState } from 'react';
import { convertTimeVideo } from '@/utils/commonFunctions';
import { SlOptions } from 'react-icons/sl';
import { Box, Button, Popper } from '@mui/material';
import Folder from '@/assets/imgs/icons/folder.svg';
import Trash from '@/assets/imgs/icons/trash.svg';
import Download from '@/assets/imgs/icons/download.svg';
const ProjectCard = () => {
	const btnPopper = useRef<HTMLSpanElement | null>(null),
		[openPopper, setOpenPopper] = useState<boolean>(false),
		handleOnClose = () => setOpenPopper(false);

	return (
		<div className="relative max-w-[371px] text-black">
			<div className="bg-[#F9F9F9] rounded-3xl py-7 px-12">
				<img
					src="https://static.laodong.vn/storage/newsportal/2023/5/20/1194887/BLACKPINK-Jennie-ELL-01.jpg"
					alt="project_img"
					loading="lazy"
					draggable={false}
					className="w-full rounded-2xl object-cover h-48"
				/>
			</div>
			<div className="flex items-center gap-1.5 mt-5 mb-3.5">
				<h2 className="font-bold text-black truncate w-11/12">
					Project siêu siêu bựsdsadsadsadsadsadsadsadasdsadsadsadasdsa
				</h2>
				<div className=" w-1/12">
					<span
						ref={btnPopper}
						onClick={() => setOpenPopper(!openPopper)}
						className="cursor-pointer h-8 w-8 rounded-full hover:bg-[#F9F9F9] flex items-center justify-center p-2"
					>
						<SlOptions color="black" size={30} />
					</span>
				</div>
			</div>

			<div className="flex items-center gap-12">
				<div className="flex items-center gap-2.5">
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.99854 19.5C7.99854 20.8807 6.87925 22 5.49854 22C4.11783 22 2.99854 20.8807 2.99854 19.5C2.99854 18.1193 4.11783 17 5.49854 17C6.87925 17 7.99854 18.1193 7.99854 19.5Z"
							stroke="#879BAC"
							stroke-width="1.5"
						/>
						<path
							d="M22.9985 19.5C22.9985 20.8807 21.8792 22 20.4985 22C19.1178 22 17.9985 20.8807 17.9985 19.5C17.9985 18.1193 19.1178 17 20.4985 17C21.8792 17 22.9985 18.1193 22.9985 19.5Z"
							stroke="#879BAC"
							stroke-width="1.5"
						/>
						<path
							d="M20.4985 17C20.3306 14.547 19.3936 14 16.2255 14H9.77149C6.60346 14 5.66642 14.547 5.49854 17"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M12.9985 6.5L13.9985 5M17.4985 6.5C17.4985 8.98528 15.4838 11 12.9985 11C10.5133 11 8.49854 8.98528 8.49854 6.5C8.49854 4.01472 10.5133 2 12.9985 2C15.4838 2 17.4985 4.01472 17.4985 6.5Z"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
					</svg>

					<span className="font-medium text-sm whitespace-nowrap">{convertTimeVideo(143425)}</span>
				</div>

				<div className="flex items-center gap-2.5">
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19.2991 17.1463L19.3621 17.1009C20.4199 16.3371 20.9489 15.9552 21.374 16.1396C21.7991 16.324 21.7991 16.9353 21.7991 18.1579V18.8421C21.7991 20.0647 21.7991 20.676 21.374 20.8604C20.9489 21.0448 20.4199 20.6629 19.3621 19.8991L19.2991 19.8537M15.2991 22H15.7991C17.449 22 18.274 22 18.7865 21.5515C19.2991 21.103 19.2991 20.3812 19.2991 18.9375V18.0625C19.2991 16.6188 19.2991 15.897 18.7865 15.4485C18.274 15 17.449 15 15.7991 15H15.2991C13.6492 15 12.8242 15 12.3117 15.4485C11.7991 15.897 11.7991 16.6188 11.7991 18.0625V18.9375C11.7991 20.3812 11.7991 21.103 12.3117 21.5515C12.8242 22 13.6492 22 15.2991 22Z"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
						/>
						<path
							d="M20.7991 12.0142V7.82643C20.7991 6.13079 20.7991 5.28297 20.5311 4.60583C20.1003 3.51725 19.1893 2.65858 18.0343 2.25256C17.3159 2 16.4164 2 14.6173 2C11.4689 2 9.8947 2 8.63743 2.44198C6.61621 3.15252 5.02188 4.65518 4.26801 6.56021C3.79907 7.7452 3.79907 9.22888 3.79907 12.1963V14.7453C3.79907 17.819 3.79907 19.3559 4.64677 20.4232C4.88965 20.729 5.17769 21.0005 5.50214 21.2294C6.26236 21.7658 7.24713 21.9421 8.79907 22"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3.79907 12C3.79907 10.1591 5.29145 8.66667 7.1324 8.66667C7.79819 8.66667 8.58311 8.78333 9.23044 8.60988C9.80559 8.45576 10.2548 8.00652 10.409 7.43136C10.5824 6.78404 10.4657 5.99912 10.4657 5.33333C10.4657 3.49238 11.9582 2 13.7991 2"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<span className="font-medium text-sm whitespace-nowrap">110.45 MB</span>
				</div>

				<div className="flex items-center gap-2.5">
					<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M11.3423 13H16.3423M8.34229 13H8.35126M13.3423 17H8.34229M16.3423 17H16.3333"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18.3423 2V4M6.34229 2V4"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M2.84229 12.2432C2.84229 7.88594 2.84229 5.70728 4.09441 4.35364C5.34653 3 7.36178 3 11.3923 3H13.2923C17.3228 3 19.3381 3 20.5902 4.35364C21.8423 5.70728 21.8423 7.88594 21.8423 12.2432V12.7568C21.8423 17.1141 21.8423 19.2927 20.5902 20.6464C19.3381 22 17.3228 22 13.2923 22H11.3923C7.36178 22 5.34653 22 4.09441 20.6464C2.84229 19.2927 2.84229 17.1141 2.84229 12.7568V12.2432Z"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M3.34229 8H21.3423"
							stroke="#879BAC"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>

					<span className="font-medium text-sm whitespace-nowrap">19/03/2023</span>
				</div>
			</div>

			<Popper
				open={openPopper}
				placement="top-end"
				anchorEl={btnPopper.current}
				sx={{
					boxShadow: '2px 2px 10px #000',
					borderRadius: '8px',
					position: 'relative',
					marginTop: '20px',
				}}
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 10],
							},
						},
					],
				}}
			>
				<Box component="ul" sx={{ border: 1, p: 1, bgcolor: 'background.paper', borderRadius: '8px' }}>
					<Box
						component="div"
						sx={{
							width: 0,
							height: 0,
							borderLeft: '8px solid transparent',
							borderRight: '8px solid transparent',
							borderTop: '15px solid white',
							position: 'absolute',
							bottom: '-10px',
							right: '10px',
						}}
					></Box>
					<Box component="li">
						<Button
							sx={{
								textTransform: 'none',
								outline: 'none !important',
								marginBottom: '8px',
								color: '#000',
							}}
							startIcon={<img src={Folder} draggable={false} loading="lazy" />}
							onClick={handleOnClose}
						>
							Rename
						</Button>
					</Box>
					<Box component="li">
						<Button
							sx={{
								textTransform: 'none',
								outline: 'none !important',
								marginBottom: '8px',
								color: '#000',
							}}
							startIcon={<img src={Trash} draggable={false} loading="lazy" />}
							onClick={handleOnClose}
						>
							Delete
						</Button>
					</Box>

					<Box component="li">
						<Button
							sx={{
								textTransform: 'none',
								outline: 'none !important',
								marginBottom: '8px',
								color: '#000',
							}}
							startIcon={<img src={Download} draggable={false} loading="lazy" />}
							onClick={handleOnClose}
						>
							Export
						</Button>
					</Box>
				</Box>
			</Popper>
		</div>
	);
};

export default ProjectCard;
