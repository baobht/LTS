import { EBroll } from '@/constants/types';

let previewUrl = '';

export const convertTimeVideo = (duration = 0): string => {
	if (duration >= 3600) {
		const timeInHours = Math.floor(duration / 3600);
		const timeRemaining = duration % 3600;
		const timeInMinutes =
			Math.floor(timeRemaining / 60) >= 10 ? Math.floor(timeRemaining / 60) : `0${Math.floor(timeRemaining / 60)}`;
		const timeInSeconds =
			Math.floor(timeRemaining % 60) >= 10 ? Math.floor(timeRemaining % 60) : `0${Math.floor(timeRemaining % 60)}`;
		console.log(`${timeInHours}:${timeInMinutes}:${timeInSeconds}`);
		return `${timeInHours}:${timeInMinutes}:${timeInSeconds}`;
	}
	const timeInMinutes = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`;
	const timeInSeconds = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : `0${Math.floor(duration % 60)}`;
	return `${timeInMinutes}:${timeInSeconds}`;
};
export const getParentElement = (element: HTMLElement, className: string): HTMLElement => {
	if (element.parentElement?.classList.contains(className)) {
		return getParentElement(element.parentElement, className);
	}
	return element;
};

const createImage = (url: any) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

function getRadianAngle(degreeValue: any) {
	return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export const getCroppedImg = async (imageSrc: any, pixelCrop: any, type: string, rotation = 0) => {
	const image: any = await createImage(imageSrc);
	const canvas = document.createElement('canvas');

	const ctx = canvas.getContext('2d');
	if (!ctx) {
		throw new Error('No 2d context');
	}
	const additionalW = type === EBroll.KENBURNS ? 50 : 0;
	const additionalH = type === EBroll.KENBURNS ? 25 : 0;

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const pixelRatio = window.devicePixelRatio;
	canvas.width = Math.floor((pixelCrop.width + additionalW * 2) * scaleX * pixelRatio);
	canvas.height = Math.floor((pixelCrop.height + additionalH * 2) * scaleY * pixelRatio);
	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = 'high';
	// const data = ctx.getImageData(0, 0, Math.floor(pixelCrop.height * scaleX * pixelRatio), Math.floor(pixelCrop.height * scaleY * pixelRatio));
	const cropX = (pixelCrop.x - additionalW) * scaleX;
	const cropY = (pixelCrop.y - additionalH) * scaleY;
	const rotateRads = (0 * Math.PI) / 180;
	const centerX = image.naturalWidth / 2;
	const centerY = image.naturalHeight / 2;

	ctx.save();

	// 5) Move the crop origin to the canvas origin (0,0)
	ctx.translate(-cropX, -cropY);
	// 4) Move the origin to the center of the original position
	ctx.translate(centerX, centerY);
	// 3) Rotate around the origin
	ctx.rotate(rotateRads);
	// 2) Scale the image
	ctx.scale(1, 1);
	// 1) Move the center of the image to the origin (0,0)
	ctx.translate(-centerX, -centerY);
	ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
	// ctx.putImageData(
	// 	data,
	// 	Math.round(0 -  Math.floor(pixelCrop.height * scaleX * pixelRatio) / 2 + image.width * 0.5 - pixelCrop.x),
	// 	Math.round(0 - Math.floor(pixelCrop.height * scaleY * pixelRatio) / 2 + image.height * 0.5 - pixelCrop.y)
	// );

	return new Promise((resolve) => {
		canvas.toBlob((file) => {
			console.log(file);
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}

			if (file) {
				previewUrl = URL.createObjectURL(file);
				resolve(previewUrl);
			}
		}, 'image/jpeg');
	});
};
