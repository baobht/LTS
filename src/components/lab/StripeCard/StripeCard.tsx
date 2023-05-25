import React from 'react';
import CheckIcon from '@/assets/imgs/icons/checkmark-circle.svg';
import { Button } from '@mui/material';

const StripeCard = ({ data }: { data: any }) => {
	const borderColor = data?.type === 'starter' ? '#EEEEEE' : data?.type === 'creator' ? '#FFF0D2' : '#D7E6FF';
	const primaryColor = data?.type === 'starter' ? '#000000' : data?.type === 'creator' ? '#FFA800' : '#4285F4';
	const lineColor = data?.type === 'starter' ? '#263238' : data?.type === 'creator' ? '#6FD800' : '#4285F4';
	const renderClassColor = (type: string) => {
		switch (type) {
			case 'starter':
				return 'border-[#EEEEEE] text-[#000000]';
			case 'creator':
				return 'border-[#FFF0D2] text-[#FFA800]';
			case 'pro':
				return 'border-[#D7E6FF] text-primary';
			default:
				return 'border-[#D7E6FF] text-primary';
		}
	};

	const renderBorderClass = (type: string) => {
		switch (type) {
			case 'starter':
				return 'border-[#263238]';
			case 'creator':
				return 'border-[#6FD800]';
			case 'pro':
				return 'border-primary';
			default:
				return 'border-primary';
		}
	};

	const renderBgClass = (type: string) => {
		switch (type) {
			case 'starter':
				return '!bg-[#000000]';
			case 'creator':
				return '!bg-[#FFA800]';
			case 'pro':
				return '!bg-primary';
			default:
				return '!bg-primary';
		}
	};

	const timeString = (duration: number) => {
		if (duration < 60) {
			return `${duration} minute`;
		}
		const newDuration = Math.ceil(duration / 60);

		return `${newDuration} hour`;
	};
	console.log(66 / 60);

	return (
		<div
			className={`flex flex-col items-center justify-center pb-9 pt-7 px-7 rounded-[40px] border w-[262px] ${renderClassColor(
				data?.type,
			)}`}
		>
			<div
				className={`w-full max-w-[160px] text-center px-8 border-b border-dashed mb-14 ${renderBorderClass(
					data?.type,
				)}`}
			>
				<h2 className="font-bold text-2xl capitalize mb-3">{data?.type}</h2>
				<p className="font-bold text-[#879BAC] text-sm">{`$${data?.price}/Month`}</p>
			</div>
			<div className="flex items-center gap-5 w-full mb-9">
				<img src={CheckIcon} alt="check icon" loading="lazy" draggable={false} />
				<p className="font-normal text-xs text-black">{timeString(data?.maxTime)} upload minutes</p>
			</div>
			<div className="flex items-center gap-5 w-full mb-16">
				<img src={CheckIcon} alt="check icon" loading="lazy" draggable={false} />
				<p className="font-normal text-xs text-black">
					Additional usage-based minutes charged at $X per additional minute
				</p>
			</div>

			<Button variant="contained" className={`!normal-case !rounded-full !outline-none ${renderBgClass(data?.type)}`}>
				{data?.type === 'starter' ? 'Start width ' : 'Upgrade width '}{' '}
				<span className="capitalize"> &nbsp;{data?.type}</span>
			</Button>
		</div>
	);
};

export default StripeCard;
