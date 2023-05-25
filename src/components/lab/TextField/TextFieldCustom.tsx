import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface ITextFieldLabel {
	type?: string;
	name: string;
	error: boolean;
	errorMessage: string;
	defaultValue: string | number;
	control?: any;
	placeholder: string;
	classCustom?: string;
	inputProps?: object;
	InputProps?: object;
	sx?: object;
}

const TextFieldCustom = (props: ITextFieldLabel) => {
	const {
		type = 'text',
		name = '',
		error = false,
		errorMessage = '',
		defaultValue = '',
		control,
		placeholder = '',
		classCustom = '',
		inputProps = {},
		...rest
	} = props;

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			render={({ field }) => (
				<TextField
					{...field}
					type={type}
					error={error}
					variant="outlined"
					value={field.value}
					helperText={errorMessage}
					placeholder={placeholder}
					className={classCustom}
					inputProps={{
						...(type === 'number' && { min: 0 }),
						...inputProps,
					}}
					{...rest}
				/>
			)}
		/>
	);
};

export default TextFieldCustom;
