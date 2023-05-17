import { convertTimeVideo } from "@/utils/commonFunctions";
import { useEffect, useRef, useState } from "react";
import { BsFillPlayFill, BsPauseFill, BsVolumeUp, BsVolumeMute } from "react-icons/bs";

interface IVideoControl {
	src: string;
}

const VideoControlCustom = (props: IVideoControl) => {
	const { src = "" } = props,
		videoRef = useRef<HTMLVideoElement | null>(null),
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
			<video
				ref={videoRef}
				src={src}
				className="rounded-lg w-full object-cover"
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

			<div className="mt-4 w-full">
				<input
					type="range"
					min={0}
					max={100}
					step={0.001}
					value={videoState.currentPercent}
					style={{ backgroundSize: `${videoState.currentPercent}%` }}
					className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer overflow-hidden"
					onChange={(e) => handleChangeCurrentTime(e.target.value)}
				/>
				<div className="mt-4 flex items-center gap-4 relative">
					{isPlay ? (
						<button
							type="button"
							className="flex h-12 w-12 bg-blue-300 rounded-full items-center justify-center p-2 border-none outline-none"
							onClick={pause}
						>
							<BsPauseFill size={20} />
						</button>
					) : (
						<button
							type="button"
							className="flex h-12 w-12 bg-blue-300 rounded-full items-center justify-center p-2 border-none outline-none"
							onClick={play}
						>
							<BsFillPlayFill size={20} />
						</button>
					)}

					<div className="group flex items-center justify-center gap-3 volume-container">
						{videoRef.current && videoRef.current.volume > 0 ? (
							<BsVolumeUp
								size={30}
								className="cursor-pointer"
								onClick={() => {
									if (videoRef.current) {
										videoRef.current.volume = 0;
									}
								}}
							/>
						) : (
							<BsVolumeMute
								size={30}
								className="cursor-pointer"
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
							className=" w-full transition-all duration-75 linear h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer overflow-hidden"
							onChange={(e) => handleChangeVolume(e.target.value)}
						/>
					</div>

					<p className="video_time absolute left-24">
						<span className="text-2xl font-bold">{videoState.currentTime || "00:00"}</span> / {videoState.duration || "00:00"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default VideoControlCustom;
