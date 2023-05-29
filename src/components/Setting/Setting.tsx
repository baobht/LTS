import { TabPanel, TabContext } from '@mui/lab';
import { Box, Button, Tab, Tabs } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlCustom, OTPInput, TextFieldCustom } from '@/components';

const Setting = () => {
	const [tabsValue, setTabsValue] = useState<number | string>(0),
		handleChangeTabs = (__: SyntheticEvent, newValue: number) => {
			setTabsValue(newValue);
		},
		onSubmit = () => {
			console.log('onSubmit');
		};

	const defaultValues = {
		password: '',
		newPassword: '',
		confirmPassword: '',
	};
	const schema = yup.object().shape({
		password: yup
			.string()
			.trim()
			.required('This field is required')
			.min(6, 'Password must have at least 6 characters')
			.max(255),
		newPassword: yup
			.string()
			.trim()
			.required('This field is required')
			.min(6, 'Password must have at least 6 characters')
			.max(255),
		confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Password must match.'),
	});

	const methods = useForm({
		mode: 'onSubmit',
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { handleSubmit, reset, control, formState } = methods;
	const { errors } = formState;

	return (
		<TabContext value={tabsValue.toString()}>
			<section className="text-black w-full h-full flex flex-col items-center py-[50px] md:px-28">
				<h2 className="font-bold text-3xl w-full mb-14">
					{tabsValue !== 2 ? 'Setting' : 'Check Email we share 6 digits OTP'}
				</h2>
				<div className="">
					<Box
						className="grow flex flex-wrap h-[224px] gap-x-[320px] gap-y-5 justify-center"
						sx={{ bgcolor: 'background.paper' }}
					>
						<Tabs
							orientation="vertical"
							value={tabsValue}
							TabIndicatorProps={{ style: { display: 'none' } }}
							onChange={handleChangeTabs}
							className={`border-none ${tabsValue === 2 ? 'hidden' : ''}`}
						>
							<Tab label="Change Password" className="normal-case font-normal text-2xl outline-none" />
							<Tab label="Delete Account" className="normal-case font-normal text-2xl outline-none" />
							<Tab label="OTP Code" className="normal-case font-normal text-2xl outline-none" />
						</Tabs>
						<TabPanel value={tabsValue.toString()} tabIndex={0} hidden={tabsValue !== 0}>
							<FormProvider {...methods}>
								<form
									className="flex flex-col bg-white pb-10 px-12 text-black md:min-w-[414px] min-h-[825px] rounded-3xl relative"
									onSubmit={handleSubmit(onSubmit)}
								>
									<div className="w-full relative mb-3">
										<h2 className="w-full font-normal text-xl normal-case text-[#879BAC]">Change password</h2>
									</div>
									<div className="flex flex-col gap-6 text-black">
										<FormControlCustom classNameLabel="text-black text-sm" label="">
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
												placeholder="Old password"
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
												name="newPassword"
												type="password"
												error={Boolean(errors?.newPassword)}
												errorMessage={errors?.newPassword?.message || ''}
												placeholder="New password"
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
												name="confirmPassword"
												type="password"
												error={Boolean(errors?.confirmPassword)}
												errorMessage={errors?.confirmPassword?.message || ''}
												placeholder="Confirm new password"
												defaultValue=""
											/>
										</FormControlCustom>
									</div>
									<Button
										sx={{ fontFamily: 'Poppins' }}
										variant="contained"
										type="submit"
										className="mt-5 w-full rounded-[10px] py-4 capitalize bg-primary font-thin outline-none text-lg"
									>
										Submit
									</Button>
								</form>
							</FormProvider>
						</TabPanel>
						<TabPanel value={tabsValue.toString()} tabIndex={1} hidden={tabsValue !== 1}>
							<Box component="div" className="flex flex-col w-full md:min-w-[414px]">
								<h2 className="w-full font-normal text-xl normal-case text-[#879BAC] mb-8">Delete account?</h2>
								<p className="text-[#879BAC] text-xl font-normal mb-[73px]">
									Are you sure your want to delete the <br />
									<span className="text-[#4285F4]">Sophia Jackib </span>account.
								</p>
								<div className="flex items-center justify-start gap-12">
									<Button
										className="bg-primary text-white rounded-lg text-lg py-[17px] px-[52px] outline-none"
										variant="contained"
									>
										Yes
									</Button>
									<Button
										className="border-primary text-black rounded-lg text-lg py-[17px] px-[52px] outline-none"
										variant="outlined"
									>
										No
									</Button>
								</div>
							</Box>
						</TabPanel>
						<TabPanel value={tabsValue.toString()} tabIndex={2} hidden={tabsValue !== 2}>
							<OTPInput setTabsValue={setTabsValue} />
						</TabPanel>
					</Box>
				</div>
			</section>
		</TabContext>
	);
};

export default Setting;
