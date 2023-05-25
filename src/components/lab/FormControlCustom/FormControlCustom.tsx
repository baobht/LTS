import { FormControl, FormLabel } from '@mui/material';

interface Props {
	label: string;
	className?: string;
	children: JSX.Element;
	classNameLabel?: string;
}

const FormControlCustom = (props: Props) => {
	const { label, children, className, classNameLabel, ...rest } = props;

	return (
		<FormControl {...rest} fullWidth>
			<FormLabel className={`${classNameLabel}`}>{label}</FormLabel>
			{children}
		</FormControl>
	);
};

export default FormControlCustom;
