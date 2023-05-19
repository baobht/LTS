import { EBroll } from '@/constants/types';
import { getCroppedImg } from '@/utils/commonFunctions';
import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop, ReactCropState, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number, percentOfCrop: number) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: percentOfCrop,
			},
			aspect,
			mediaWidth,
			mediaHeight,
		),
		mediaWidth,
		mediaHeight,
	);
}

const initData = [
	{
		id: 1,
		imageURL: 'https://images2.thanhnien.vn/528068263637045248/2023/3/4/01-16779037843901605214909.jpg',
		croppedImageURL: null,
	},
];

const ImageEditor = () => {
	const [images, setImages] = useState(initData);
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [scale, setScale] = useState<number>(1);
	const [rotate, setRotate] = useState<number>(0);
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [zoom, setZoom] = useState(0);
	const [typeOfBRoll, setTypeOfBRoll] = useState(EBroll.CROP);
	const [crop, setCrop] = useState<Crop>();
	const [aspect, setAspect] = useState<number | undefined>(16 / 9);

	const setCroppedImageFor = (
		id: number,
		crop: any,
		zoom: number,
		aspect: number | undefined,
		croppedImageURL: any,
	) => {
		const imageIndex = images.findIndex((image) => image.id === id);
		const newImages = images.map((image, index) => {
			if (index === imageIndex) {
				return {
					...image,
					croppedImageURL,
					crop,
					zoom,
					aspect,
				};
			}

			return image;
		});

		setImages(newImages);
		setSelectedImage(null);
	};

	const onCrop = async () => {
		const croppedImageURL = await getCroppedImg(selectedImage.imageURL, completedCrop, typeOfBRoll);
		setCroppedImageFor(selectedImage.id, crop, zoom, aspect, croppedImageURL);
	};

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (typeOfBRoll === EBroll.FIT) {
			const { width, height } = e.currentTarget;
			const newAspect = 3 / 2;
			setCrop(centerAspectCrop(width, height, newAspect, 100));
		}
		if (aspect && typeOfBRoll === EBroll.CROP) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect, 50));
		}
	}

	useEffect(() => {
		if (imageRef.current) {
			// const { width, height } = imageRef.current;
			// setAspect(16 / 9);
			// setCrop(centerAspectCrop(width, height, aspect));
			setAspect(undefined);
		}
	}, [imageRef.current]);

	useEffect(() => {
		if (selectedImage && completedCrop) document.addEventListener('keydown', onCrop);

		return () => {
			if (selectedImage) document.removeEventListener('keydown', onCrop);
		};
	}, [crop, selectedImage, completedCrop]);

	return (
		<div className="flex gap-3">
			<div className="">Text Image</div>
			{selectedImage && (
				<ReactCrop
					crop={crop}
					onChange={(crop, percentCrop) => {
						setCompletedCrop(crop);
						setCrop(percentCrop);
					}}
					onComplete={(c) => {
						setCompletedCrop(c);
					}}
					aspect={aspect}
					locked={typeOfBRoll === EBroll.FIT}
					disabled={typeOfBRoll === EBroll.FIT}
					renderSelectionAddon={(state: ReactCropState) => {
						return (
							<Box
								component="span"
								sx={{
									width: `${(completedCrop?.width || 0) + 100}px`, //x
									height: `${(completedCrop?.height || 0) + 50}px`, //y
									transform: 'translate(-50px,-25px)',
									zIndex: -1,
									'&::after': {
										textShadow: '1px 1px black;',
									},
								}}
								className={`border-2 border-primary border-dashed rounded-md absolute flex items-end p-1 text-sm after:content-['Start'] after:absolute  after:bottom-7 after:left-14`}
							>
								End
							</Box>
						);
					}}
				>
					<img
						loading="lazy"
						ref={imageRef}
						alt="Crop me"
						src={selectedImage?.imageURL}
						style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
			<Box
				className={`text-center overflow-hidden`}
				sx={{
					width: `${(completedCrop?.width || 500) + 100}px`,
					height: `${(completedCrop?.height || 350) + 50}px`,
					minWidth: (completedCrop?.width || 500) < 200 ? 'unset' : `${(completedCrop?.width || 500) + 100}px`,
					minHeight: (completedCrop?.height || 350) < 100 ? 'unset' : `${(completedCrop?.height || 350) + 50}px`,
				}}
			>
				{images.length > 0 &&
					images.map((image, index) => (
						<img
							loading="lazy"
							src={image?.croppedImageURL || image.imageURL}
							key={index}
							alt="Cropped Image"
							className="w-full h-full object-cover kenburns-effect"
							style={
								{
									'--scaleX': `${((completedCrop?.width || 500) + 100) / (completedCrop?.width || 500)}`,
									'--scaleY': `${((completedCrop?.height || 350) + 50) / (completedCrop?.height || 350)}`,
								} as React.CSSProperties
							}
							onClick={() => setSelectedImage(image)}
						/>
					))}
			</Box>
		</div>
	);
};

export default ImageEditor;
