/* eslint-disable @typescript-eslint/no-empty-function */
import Logo from '@/assets/imgs/icons/logo.svg';
import { EForms } from '@/constants/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Backdrop, Button, Theme } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FaRegTimesCircle } from 'react-icons/fa';
import * as yup from 'yup';
import FormControlCustom from '../FormControlCustom/FormControlCustom';
import TextFieldCustom from '../TextField/TextFieldCustom';
const AuthForm = () => {
	const queryClient = useQueryClient();
	const { data: openAuth } = useQuery(
		['openAuth'],
		() => {
			return false;
		},
		{
			initialData() {
				return true;
			},
		},
	);
	const { data: authFormType } = useQuery(
		['authFormType'],
		() => {
			return EForms.SIGNIN;
		},
		{
			initialData() {
				return EForms.SIGNIN;
			},
		},
	);

	const defaultValues = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
	};
	const schema = yup.object().shape({
		email: yup.string().email('Please enter a valid email').trim().required('This field is required').max(255),
		password: yup
			.string()
			.required('This field is required')
			.trim()
			.min(6, 'Password must have at least 6 characters')
			.max(255),
		...(authFormType === EForms.SIGNUP && {
			firstName: yup.string().trim().required('This field is required').max(50),
			lastName: yup.string().trim().required('This field is required').max(50),
		}),
	});

	const methods = useForm({
		mode: 'onSubmit',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { handleSubmit, reset, control, formState } = methods;
	const { errors } = formState;
	const handleClose = () => {
		queryClient.setQueryData(['openAuth'], false);
	};

	const onSubmit = (value = defaultValues) => {
		console.log('🚀 ~ file: AuthForm.tsx:71 ~ onSubmit ~ value:', value);
	};

	useEffect(() => {
		if (!openAuth) {
			reset();
		}
	}, [openAuth]);

	useEffect(() => {
		reset();
	}, [authFormType]);

	return (
		<Backdrop
			sx={{
				color: '#fff',
				zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
				backdropFilter: 'blur(28px)',
				backgroundColor: '#4285f433',
			}}
			open={openAuth}
		>
			<FormProvider {...methods}>
				<form
					className="flex flex-col bg-white pt-5 pb-10 px-12 text-black min-w-[588px] min-h-[825px] rounded-3xl relative"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex items-center justify-between ">
						<img src={Logo} alt="Rollify" className="absolute left-7 top-6 w-[86px] h-[33px]" draggable={false} />
						<span className="absolute right-3 top-6 cursor-pointer" onClick={handleClose}>
							<FaRegTimesCircle color="black" size={32} />
						</span>
					</div>
					<div className="w-full border-b border-[#DAE8FD] pb-6 relative mb-12 mt-14">
						<h2 className="text-center w-full font-normal text-xl capitalize">
							{authFormType === EForms.SIGNIN ? 'Sign in' : 'Create your account'}
						</h2>

						<GoogleLogin
							onSuccess={(credentialResponse) => {
								console.log(credentialResponse);
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/>
						<p className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 h-4 bg-white">Or</p>
					</div>
					<div className="flex flex-col gap-6 text-black">
						{authFormType === EForms.SIGNUP && (
							<div className="flex gap-7">
								<FormControlCustom classNameLabel="text-black text-sm" label="First name">
									<TextFieldCustom
										sx={{
											'& .MuiOutlinedInput-notchedOutline': {
												borderRadius: '10px',
											},
										}}
										classCustom="rounded-[10px]"
										name="firstName"
										error={Boolean(errors?.firstName)}
										errorMessage={errors?.firstName?.message || ''}
										placeholder=""
										defaultValue=""
									/>
								</FormControlCustom>
								<FormControlCustom classNameLabel="text-black text-sm" label="Last name">
									<TextFieldCustom
										sx={{
											'& .MuiOutlinedInput-notchedOutline': {
												borderRadius: '10px',
											},
										}}
										classCustom="rounded-[10px]"
										name="lastName"
										error={Boolean(errors?.lastName)}
										errorMessage={errors?.lastName?.message || ''}
										placeholder=""
										defaultValue=""
									/>
								</FormControlCustom>
							</div>
						)}
						<FormControlCustom classNameLabel="text-black text-sm" label="Email">
							<TextFieldCustom
								sx={{
									'& .MuiOutlinedInput-notchedOutline': {
										borderRadius: '10px',
									},
								}}
								classCustom="rounded-[10px]"
								name="email"
								error={Boolean(errors?.email)}
								errorMessage={errors?.email?.message || ''}
								placeholder=""
								defaultValue=""
							/>
						</FormControlCustom>
						<FormControlCustom classNameLabel="text-black text-sm" label="Password">
							<TextFieldCustom
								sx={{
									'& .MuiOutlinedInput-notchedOutline': {
										borderRadius: '10px',
									},
								}}
								classCustom="rounded-[10px]"
								name="password"
								type="password"
								error={Boolean(errors?.password)}
								errorMessage={errors?.password?.message || ''}
								placeholder=""
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
						{authFormType === EForms.SIGNIN ? 'Sign in' : 'Create account'}
					</Button>
					<div className="flex flex-col flex-1 justify-end text-center items-center">
						<div className="text-[#879BAC] text-sm font-light">
							By clicking “Continue” I agree to B-rollify{' '}
							<a className="text-primary underline" target="_blank" href="https://google.com">
								Terms of Service
							</a>{' '}
							and{' '}
							<a className="text-primary underline" target="_blank" href="https://google.com">
								Privacy Policy
							</a>
						</div>
						<div className="mt-[22px]">
							{authFormType === EForms.SIGNIN ? 'Don’t have an account?' : 'Already have an account?'}
						</div>
						<div
							className="cursor-pointer text-primary mt-3 select-none w-fit"
							onClick={() => {
								queryClient.setQueryData(
									['authFormType'],
									authFormType === EForms.SIGNIN ? EForms.SIGNUP : EForms.SIGNIN,
								);
							}}
						>
							{authFormType === EForms.SIGNIN ? 'Create account' : 'Sign in'}
						</div>
					</div>
				</form>
			</FormProvider>
		</Backdrop>
	);
};

export default AuthForm;
