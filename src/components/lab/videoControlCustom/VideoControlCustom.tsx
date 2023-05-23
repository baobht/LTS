import { convertTimeVideo } from '@/utils/commonFunctions';
import { Box, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill, BsVolumeUp, BsVolumeMute } from 'react-icons/bs';

interface IVideoControl {
	src: string;
}

const VideoControlCustom = (props: IVideoControl) => {
	const { src = '' } = props,
		videoRef = useRef<HTMLVideoElement | null>(null),
		[isVideoLoading, setIsVideoLoading] = useState<boolean>(true),
		[isPlay, setIsPlay] = useState<boolean>(false),
		[videoState, setVideoState] = useState<any>({ currentPercent: 0, volume: 0.6 }),
		play = () => {
			if (videoRef.current) {
				setIsPlay(true);
				videoRef.current.play();
			}
		},
		pause = () => {
			if (videoRef.current) {
				setIsPlay(false);
				videoRef.current.pause();
			}
		},
		handleChangeVolume = (value: number | string) => {
			if (videoRef.current) {
				videoRef.current.volume = Number(value);
				setVideoState({
					...videoState,
					volume: Number(value),
				});
			}
		},
		handleChangeCurrentTime = (value: number | string) => {
			if (videoRef.current) {
				const newCurrentTime = (videoRef.current.duration / 100) * Number(value);
				videoRef.current.currentTime = newCurrentTime;
				setVideoState({ ...videoState, currentPercent: Number(value), currentTime: convertTimeVideo(newCurrentTime) });
			}
		};

	useEffect(() => {
		if (videoRef.current?.duration) {
			setVideoState({ ...videoState, duration: convertTimeVideo(videoRef.current?.duration) });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoRef.current]);
	return (
		<div className="w-full relative">
			{!isVideoLoading ? (
				<>
					<video
						ref={videoRef}
						src={src}
						className="rounded-[10px] w-full object-cover"
						onCanPlay={(e) => {
							setVideoState({
								...videoState,
								duration: convertTimeVideo(e.currentTarget?.duration),
								volume: e.currentTarget.volume,
							});
						}}
						onTimeUpdate={(e) => {
							setVideoState({
								...videoState,
								currentPercent: (e.currentTarget.currentTime / e.currentTarget.duration) * 100,
								currentTime: convertTimeVideo(e.currentTarget.currentTime),
							});
						}}
						onEnded={() => setIsPlay(!isPlay)}
					></video>

					<div className="mt-9 w-full">
						<input
							type="range"
							min={0}
							max={100}
							step={0.001}
							value={videoState.currentPercent}
							style={{ backgroundSize: `${videoState.currentPercent}%` }}
							className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer overflow-hidden"
							onChange={(e) => handleChangeCurrentTime(e.target.value)}
						/>
						<div className="mt-[35px] flex items-center justify-between gap-4 px-4">
							<div className="flex items-center gap-5 w-full">
								{isPlay ? (
									<button
										type="button"
										className="flex h-8 w-8 bg-primary rounded-full items-center justify-center p-2 border-none outline-none"
										onClick={pause}
									>
										<BsPauseFill size={20} />
									</button>
								) : (
									<button
										type="button"
										className="flex h-8 w-8 bg-primary rounded-full items-center justify-center p-2 border-none outline-none"
										onClick={play}
									>
										<BsFillPlayFill size={20} />
									</button>
								)}

								<div className="group flex items-center justify-center gap-3 volume-container">
									{videoRef.current && videoRef.current.volume > 0 ? (
										<BsVolumeUp
											size={40}
											className="cursor-pointer text-black"
											onClick={() => {
												if (videoRef.current) {
													videoRef.current.volume = 0;
												}
											}}
										/>
									) : (
										<BsVolumeMute
											size={40}
											className="cursor-pointer text-black"
											onClick={() => {
												if (videoRef.current) {
													videoRef.current.volume = videoState.volume;
												}
											}}
										/>
									)}
									<input
										type="range"
										min={0}
										max={1}
										step={0.001}
										value={videoState?.volume}
										style={{ backgroundSize: `${videoState?.volume * 100}%` }}
										className=" w-full transition-all duration-75 linear h-1 bg-[#DAE8FD] rounded-lg appearance-none cursor-pointer overflow-hidden"
										onChange={(e) => handleChangeVolume(e.target.value)}
									/>
								</div>
							</div>

							<p className="video_time w-full text-end text-black text-sm font-bold select-none ">
								<span className="text-3xl">{videoState.currentTime || '00:00'}</span> / {videoState.duration || '00:00'}
							</p>
						</div>
					</div>
				</>
			) : (
				<>
					<Box>
						<Skeleton
							sx={{ borderRadius: '10px', marginBottom: '35px' }}
							animation="wave"
							variant="rectangular"
							width="100%"
							height="500px"
						/>
						<Skeleton animation="wave" width="100%" height="8px" />
					</Box>
				</>
			)}
			<video
				src={src}
				className="hidden"
				onCanPlay={() => {
					setIsVideoLoading(false);
				}}
			></video>
		</div>
	);
};

export default VideoControlCustom;
