export const convertTimeVideo = (duration = 0): string => {
	const timeInMinutes = Math.floor(duration / 60) >= 10 ? Math.floor(duration / 60) : `0${Math.floor(duration / 60)}`;
	const timeInSeconds = Math.floor(duration % 60) >= 10 ? Math.floor(duration % 60) : `0${Math.floor(duration % 60)}`;
	return `${timeInMinutes}:${timeInSeconds}`;
};
export const getParentElement = (element: HTMLElement): HTMLElement => {
	if (element.parentElement?.classList.contains('select-none')) {
		return getParentElement(element.parentElement);
	}
	return element;
};


const createImage = (url: any) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
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
export const  getCroppedImg = async(imageSrc: any, pixelCrop: any, rotation = 0) => {
    console.log("🚀 ~ file: commonFunctions.ts:34 ~ getCroppedImg ~ pixelCrop:", pixelCrop)
   
  const image: any = await createImage(imageSrc);
  const canvas = document.createElement("canvas") ;

	const ctx = canvas.getContext("2d") ;
	
	// const maxSize = Math.max(image.width, image.height);
	// const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
	
	// canvas.width = safeArea;
	// canvas.height = safeArea;
	if(!ctx){
		throw new Error('No 2d context')
	}

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const pixelRatio = window.devicePixelRatio;
	canvas.width =  Math.floor(pixelCrop.height * scaleX * pixelRatio);
	canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio);
	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = 'high'
	const data = ctx.getImageData(0, 0, Math.floor(pixelCrop.height * scaleX * pixelRatio), Math.floor(pixelCrop.height * scaleY * pixelRatio));
		
// 		const cropX = pixelCrop.x * scaleX
// 		const cropY = pixelCrop.y * scaleY
// 		const rotateRads = rotate * TO_RADIANS
//   const centerX = image.naturalWidth / 2
//   const centerY = image.naturalHeight / 2
		ctx.putImageData(
			data,
			Math.round(0 -  Math.floor(pixelCrop.height * scaleX * pixelRatio) / 2 + image.width * 0.5 - pixelCrop.x),
			Math.round(0 - Math.floor(pixelCrop.height * scaleY * pixelRatio) / 2 + image.height * 0.5 - pixelCrop.y)
		);
		
		
		return new Promise((resolve) => {
			canvas.toBlob((file) => {
			console.log(file);
			if(file){
				resolve(URL.createObjectURL(file));
			}
			}, "image/jpeg");
		});
  }


