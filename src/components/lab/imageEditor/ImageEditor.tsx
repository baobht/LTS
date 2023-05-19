import { getCroppedImg } from '@/utils/commonFunctions';
import { useEffect, useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
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
	const [crop, setCrop] = useState<Crop>();
	const [aspect, setAspect] = useState<number | undefined>(16 / 9);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(0);
	const testImage = useRef<HTMLImageElement | null>(null);

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
		const croppedImageURL = await getCroppedImg(selectedImage.imageURL, completedCrop);
		setCroppedImageFor(selectedImage.id, crop, zoom, aspect, croppedImageURL);
	};

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
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
		if (testImage.current) {
			testImage.current.width = testImage.current.naturalWidth / testImage.current.width;
			testImage.current.height = testImage.current.naturalHeight / testImage.current.height;
		}
	}, [testImage.current]);

	useEffect(() => {
		if (selectedImage) document.addEventListener('keydown', onCrop);

		return () => {
			if (selectedImage) document.removeEventListener('keydown', onCrop);
		};
	}, [crop, selectedImage]);

	return (
		<div className="flex gap-3">
			<div className="">Text Image</div>
			{selectedImage && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					aspect={aspect}
				>
					<img
						ref={imageRef}
						alt="Crop me"
						src={selectedImage?.imageURL}
						style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
			<div className="text-center">
				<img ref={testImage} src={images[0].imageURL} alt="" />
				{images.length > 0 &&
					images.map((image, index) => (
						<img
							src={image?.croppedImageURL || image.imageURL}
							key={index}
							alt=""
							className="w-[600px]"
							onClick={() => setSelectedImage(image)}
						/>
					))}
			</div>
		</div>
	);
};

export default ImageEditor;
