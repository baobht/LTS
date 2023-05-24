/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode, UIEvent } from 'react';

interface IScrollView {
	onYReachStart?: Function | undefined;
	onYReachEnd?: Function | undefined;
	onXReachStart?: Function | undefined;
	onXReachEnd?: Function | undefined;
	children: ReactNode;
	sx?: string;
}

const ScrollView = (props: IScrollView) => {
	const {
			onXReachEnd = undefined,
			onXReachStart = undefined,
			onYReachStart = undefined,
			onYReachEnd = undefined,
			children,
			sx = '',
		} = props,
		handleScroll = (event: UIEvent<HTMLDivElement>) => {
			const element = event.currentTarget as HTMLElement;
			if (element && element.scrollTop === 0 && onYReachStart) {
				onYReachStart(event);
			} else if (element && element.scrollHeight - element.scrollTop === element.clientHeight && onYReachEnd) {
				onYReachEnd(event);
			}
		};

	return (
		<div className={`w-full h-full overflow-auto ${sx}`} onScroll={(e) => handleScroll(e)}>
			{children}
		</div>
	);
};

export default ScrollView;
