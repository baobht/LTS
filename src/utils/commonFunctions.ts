export const convertTimeVideo = (duration = 0): string => {
	const timeInMinutes = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`;
	const iimeInSeconds = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : `0${Math.floor(duration % 60)}`;
	return `${timeInMinutes}:${iimeInSeconds}`;
};
export const getParentElement = (element: HTMLElement): HTMLElement => {
	if (element.parentElement?.classList.contains('select-none')) {
		return getParentElement(element.parentElement);
	}
	return element;
};
