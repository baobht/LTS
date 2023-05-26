import React from 'react';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import { FormControlCustom, TextFieldCustom } from '@/components';

const Support = () => {
	const defaultValues = {
		email: '',
		name: '',
		subject: '',
		message: '',
	};

	const schema = yup.object().shape({
		name: yup.string().trim().required('This field is required').max(100),
		email: yup.string().trim().email('Please enter a valid email').required('This field is required').max(255),
		subject: yup
			.string()
			.trim()
			.required('This field is required')
			// .min(6, 'Password must have at least 6 characters')
			.max(255),
		message: yup.string().trim(),
	});

	const methods = useForm({
		mode: 'onSubmit',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { handleSubmit, reset, control, formState } = methods;
	const { errors } = formState;
	const onSubmit = () => {
		console.log('onSubmit');
	};

	return (
		<section className="text-black w-full h-full py-[50px]">
			<h2 className="font-bold text-3xl">Help</h2>
			<div className="flex items-center justify-center">
				<FormProvider {...methods}>
					<form
						className="flex flex-col bg-white pt-5 pb-10 px-12 text-black min-w-[512px] min-h-[825px] max-w-[512px] rounded-3xl relative"
						onSubmit={handleSubmit(onSubmit)}
					>
						<h3 className="text-[#879BAC] text-xl mb-5">How we can help you. Please write down.</h3>
						<div className="flex flex-col gap-6 text-black">
							<FormControlCustom classNameLabel="text-black text-sm" label="">
								<TextFieldCustom
									sx={{
										'& .MuiOutlinedInput-notchedOutline': {
											borderRadius: '10px',
										},
									}}
									classCustom="rounded-[10px]"
									name="name"
									type="text"
									error={Boolean(errors?.name)}
									errorMessage={errors?.name?.message || ''}
									placeholder="Name"
									defaultValue=""
								/>
							</FormControlCustom>
							<FormControlCustom classNameLabel="text-black text-sm" label="">
								<TextFieldCustom
									sx={{
										'& .MuiOutlinedInput-notchedOutline': {
											borderRadius: '10px',
										},
									}}
									classCustom="rounded-[10px]"
									name="email"
									type="email"
									error={Boolean(errors?.email)}
									errorMessage={errors?.email?.message || ''}
									placeholder="Email"
									defaultValue=""
								/>
							</FormControlCustom>
							<FormControlCustom classNameLabel="text-black text-sm" label="">
								<TextFieldCustom
									sx={{
										'& .MuiOutlinedInput-notchedOutline': {
											borderRadius: '10px',
										},
									}}
									classCustom="rounded-[10px]"
									name="subject"
									type="text"
									error={Boolean(errors?.subject)}
									errorMessage={errors?.subject?.message || ''}
									placeholder="Subject"
									defaultValue=""
								/>
							</FormControlCustom>
							<FormControlCustom classNameLabel="text-black text-sm" label="">
								<TextFieldCustom
									sx={{
										'& .MuiOutlinedInput-notchedOutline': {
											borderRadius: '10px',
											height: '240px',
										},
									}}
									classCustom="rounded-[10px] h-60"
									name="message"
									type="text"
									error={Boolean(errors?.message)}
									errorMessage={errors?.message?.message || ''}
									placeholder="Message..."
									defaultValue=""
								/>
							</FormControlCustom>
						</div>
						<Button
							sx={{ fontFamily: 'Poppins' }}
							variant="contained"
							type="submit"
							className="mt-5 w-full rounded-[10px] py-4 capitalize bg-primary font-thin"
						>
							Submit
						</Button>
					</form>
				</FormProvider>
			</div>
		</section>
	);
};

export default Support;
