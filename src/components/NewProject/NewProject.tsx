/* eslint-disable react-hooks/exhaustive-deps */
import { UploadProgressing } from '@/components';
import { videoAcceptTypes } from '@/constants/types';
import { videoUpload } from '@/services/video.service';
import { Box, Button, Popper } from '@mui/material';
import { ChangeEvent, SetStateAction, useEffect, useId, useRef, useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
const NewProject = () => {
	const renderId = useId(),
		menuRef = useRef<HTMLDivElement | null>(null),
		[openPopper, setOpenPopper] = useState<boolean>(false),
		[uploadFile, setUploadFile] = useState<SetStateAction<File | null>>(null),
		[uploadProgressing, setUploadProgressing] = useState<number>(0),
		handleOnPaste = (event: any): void => {
			console.log('event', event);
			event.preventDefault();
			if (uploadFile || uploadProgressing || openPopper) return;
			const file = event.dataTransfer ? event.dataTransfer.files[0] : null;
			if (
				file &&
				file?.type.startsWith('video/') &&
				videoAcceptTypes.includes(file?.type.split('/')[1].toUpperCase())
			) {
				setUploadFile(file);
			} else {
				console.log('toast error');
			}
		},
		handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
			if (event.target && event.target?.files && event.target?.files?.length > 0) {
				const file = event.target?.files[0];
				if (videoAcceptTypes.includes(file?.type.split('/')[1].toUpperCase())) {
					setUploadFile(file);
				}
			} else {
				console.log('toast error');
			}
		};

	useEffect(() => {
		const handleUpload = async (): Promise<void> => {
			if (uploadFile) {
				const formData = new FormData();
				// formData.append('userId', user?.id);
				formData.append('video', uploadFile as Blob);
				const res = await videoUpload(formData, setUploadProgressing);
				if (res.status === 200) {
					setUploadFile(null);
					setUploadProgressing(0);
				}
			}
		};
		if (uploadFile) handleUpload();
	}, [uploadFile]);

	// useEffect(() => {
	// 	setInterval(() => setUploadProgressing((pre) => (pre === 100 ? 0 : pre + 1)), 1000);
	// }, []);

	return (
		<section className="w-full h-full bg-white text-black flex flex-col items-center justify-center">
			<h2 className="font-bold text-5xl mb-8">Rollify Your Video</h2>
			<p className="text-xl font-medium text-[#929292] mb-24">Easily find and add B-roll to your videos ⚡️</p>
			<div
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleOnPaste}
				ref={menuRef}
				className="w-full max-w-[508px] min-h-[253px] border border-dashed rounded-2xl border-[#879BAC] flex items-center justify-center px-8 pt-11 pb-10"
			>
				{!uploadFile && !uploadProgressing ? (
					<div className="w-full px-[47px] flex flex-col items-center justify-center">
						<MdOutlineDriveFolderUpload size={35} color="#4285f4" className="mb-6" />
						<p className="font-normal text-[#929292] mb-4">Drag and drop/click to upload (mp4 only)</p>
						<p className="uppercase font-normal mb-4">OR</p>
						<Box
							component="label"
							htmlFor={renderId}
							className="cursor-pointer outline-none normal-case text-primary bg-[#f1f6ff] rounded-[7.80223px] text-[16px] py-4 px-[68px] hover:bg-[#f1f6ff]"
						>
							Browse
						</Box>
					</div>
				) : (
					<UploadProgressing progressState={uploadProgressing} />
				)}
			</div>

			<input type="file" id={renderId} className="hidden" accept="video/*" onChange={handleOnChange} />

			<Popper
				className="bg-white rounded-2xl px-12 pb-14 max-w-[625px]"
				sx={{
					boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
				}}
				open={openPopper}
				anchorEl={menuRef.current}
				placement="bottom"
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, -200],
							},
						},
					],
				}}
			>
				<span className="absolute right-6 top-5 cursor-pointer" onClick={() => setOpenPopper(false)}>
					<FaRegTimesCircle color="black" size={32} />
				</span>
				<div className="pt-16 text-center flex flex-col items-center gap-8">
					<h3 className="font-normal text-lg">
						Oops! You're not logged in. Login or create a free account to start adding B-roll to your video 🔑
					</h3>
					<Button className="bg-primary text-white py-5 px-16 rounded-2xl outline-none">Sign up</Button>
					<p className="text-sm font-normal text-[#879BAC]">
						Already got an account? <span className=" text-[#4285F4] cursor-pointer"> Log in</span>
					</p>
				</div>
			</Popper>
		</section>
	);
};

export default NewProject;
