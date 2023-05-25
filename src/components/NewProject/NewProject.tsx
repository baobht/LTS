/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button } from '@mui/material';
import { useId, useState, useEffect, ChangeEvent, SetStateAction } from 'react';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { videoAcceptTypes } from '@/constants/types';
import { UploadProgressing } from '@/components';
import { videoUpload } from '@/services/video.service';
const NewProject = () => {
	const isUser = false;
	const renderId = useId(),
		[uploadFile, setUploadFile] = useState<SetStateAction<File | null>>(null),
		[uploadProgressing, setUploadProgressing] = useState<number>(30),
		handleOnPaste = (event: any) => {
			event.preventDefault();
			if (uploadFile && uploadProgressing) return;
			const file = event.dataTransfer.files[0];
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
		handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
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
		const handleUpload = async () => {
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

	return (
		<section className="w-full h-full bg-white text-black flex flex-col items-center justify-center">
			<h2 className="font-bold text-5xl mb-8">Rollify Your Video</h2>
			<p className="text-xl font-medium text-[#929292] mb-24">Easily find and add B-roll to your videos ⚡️</p>
			<div
				onDragOver={(e) => e.preventDefault()}
				onDrop={handleOnPaste}
				className="w-full max-w-[508px] min-h-[253px] border border-dashed rounded-2xl border-[#879BAC] flex items-center justify-center px-8 pt-11 pb-10"
			>
				{uploadFile && uploadProgressing ? (
					<div className="w-full px-[57px] flex flex-col items-center justify-center">
						<MdOutlineDriveFolderUpload size={35} color="#4285f4" className="mb-6" />
						<p className="font-normal text-[#929292] mb-4">Drag and drop/click to upload (mp4 only)</p>
						<p className="uppercase font-normal mb-4">OR</p>
						<Box
							component="label"
							htmlFor={renderId}
							sx={{
								cursor: 'pointer',
								outline: 'none !important',
								textTransform: 'none',
								color: '#4285F4',
								backgroundColor: '#F1F6FF',
								borderRadius: '7.80223px',
								fontSize: '16px',
								padding: '15px 68px',
								'&:hover': {
									backgroundColor: '#F1F6FF !important',
								},
							}}
						>
							Browse
						</Box>
					</div>
				) : (
					<UploadProgressing progressState={uploadProgressing} />
				)}
			</div>

			<input type="file" id={renderId} className="hidden" accept="video/*" onChange={handleOnChange} />
		</section>
	);
};

export default NewProject;
