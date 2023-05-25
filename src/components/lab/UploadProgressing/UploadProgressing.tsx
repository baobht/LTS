const UploadProgressing = ({ progressState }: { progressState: number }) => {
	return (
		<div>
			<div className="w-full bg-[#E4EEFF] h-8 rounded-full overflow-hidden relative mb-3">
				<div
					style={{ width: `${progressState}%`, '--width': `${progressState - 1}%` } as React.CSSProperties}
					className={`overflow-hidden min-w-[10%] rounded-full text-white flex items-center justify-end px-4 h-full bg-[#4285F4] progress_bar`}
				>
					<span className="z-10 relative">{progressState}%</span>
				</div>
			</div>
			<p className="font-normal text-xs text-[#879BAC] text-center px-7">
				Please keep this window open until your video is fully uploaded. This may take a few minutes
			</p>
		</div>
	);
};

export default UploadProgressing;
