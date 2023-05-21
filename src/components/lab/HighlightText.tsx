interface IHighlightText {
	// eslint-disable-next-line @typescript-eslint/ban-types
	handleHighlightText: Function;
	data: {
		atTime: string;
		content: string;
	};
	index: number;
}

const HighlightText = (props: IHighlightText) => {
	const { handleHighlightText = undefined, data, index } = props;

	return (
		<div className="bg-white rounded-md p-4 text-black">
			<span id={`paragraph_${index}`} onMouseUp={(e) => (handleHighlightText ? handleHighlightText(e, index) : null)}>
				{data.content}
			</span>
		</div>
	);
};

export default HighlightText;
