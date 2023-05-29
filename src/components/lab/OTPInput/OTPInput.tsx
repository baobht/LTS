/* eslint-disable @typescript-eslint/ban-types */
import { useState, useRef } from 'react';
import { Button } from '@mui/material';

interface IOTPInput {
	setTabsValue: Function;
}

const OTPInput = ({ setTabsValue }: IOTPInput) => {
	const [OTPCode, setOTPCode] = useState<string[] | number[] | null[]>(Array(6).fill(null));
	const OTPContainer = useRef<HTMLDivElement | null>(null);
	const onSubmit = (event: any) => {
		event.preventDefault();
		if (OTPCode.some((value) => isNaN(Number(value)) === true || value === null || value === ''))
			return OTPContainer.current?.classList.add('otp_error');
		console.log(OTPCode.join(''));
		setOTPCode(Array(6).fill(null));
		setTabsValue(0);
	};

	const handleOnChange = (value: number | string | null, index: number) => {
		if (value && (Number(value) < 0 || Number(value) > 9)) return;
		OTPContainer.current?.classList.remove('otp_error');
		const newOtp = OTPCode.map((val, i) => {
			if (index === i) {
				return value;
			}

			return val;
		});
		const inputElements = document.querySelectorAll('.otp_input');
		if (index < newOtp.length - 1 && value) {
			(inputElements[index + 1] as any).focus();
		}

		setOTPCode(newOtp as string[]);
	};
	const handleKeyDown = (e: Event, key: string) => {
		const invalidKeys = ['e', '+', '-'];
		if (invalidKeys.includes(key)) {
			e.preventDefault();
		}
	};

	const handleOnPase = (value: string, index: number) => {
		if (value && isNaN(Number(value))) return;
		const valueArray = value
			.split('')
			.slice(0, 6)
			.concat(Array(6 - value.length).fill(''));

		setOTPCode(valueArray);
	};

	return (
		<div className="w-full mt-28">
			<div className="otp_container flex items-center justify-center gap-6">
				<form
					className="flex flex-col bg-white pb-10 px-2 md:px-12 text-black  min-h-[825px] rounded-3xl relative"
					onSubmit={onSubmit}
				>
					<div className="w-full relative mb-3">
						<h2 className="w-full font-normal text-xl normal-case text-[#879BAC] mb-3">Enter OTP</h2>
					</div>
					<div ref={OTPContainer} className="flex gap-2 md:gap-6 text-black otp_container">
						{OTPCode.length > 0 &&
							OTPCode.map((code, index) => (
								<input
									key={`number_${index}`}
									name={`number_${index}`}
									type="number"
									min={0}
									max={9}
									maxLength={1}
									className="h-[45px] w-[45px] md:h-[60px] md:w-[60px] border border-[#c7c7c7] bg-transparent rounded-[10px] outline-none otp_input text-center"
									value={code ?? ''}
									onKeyDown={(e) => handleKeyDown(e as unknown as Event, e.key)}
									onPaste={(e) => handleOnPase(e.clipboardData.getData('text').trim(), index)}
									onChange={(e) => handleOnChange(e.target.value, index)}
								/>
							))}
					</div>
					<Button
						sx={{ fontFamily: 'Poppins' }}
						variant="contained"
						type="submit"
						className="mt-[52px] w-full rounded-[10px] py-4 capitalize bg-primary font-thin outline-none text-lg"
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default OTPInput;
