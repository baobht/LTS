import videoURL from '@/assets/videos/video.mp4';
import { HighlightText, ImageEditor, VideoControlCustom } from '@/components';
import { getParentElement } from '@/utils/commonFunctions';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface IListData {
	atTime: string;
	content: string;
}

const listData: IListData[] = [
	{
		atTime: '0,9s',
		content:
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit sequi provident deleniti excepturi eaque. Veniam libero voluptates laudantium minus in obcaecati odio ab reiciendis? Pariatur sint magni voluptas perspiciatis cumque beatae fugit fuga. Laborum labore incidunt veniam illo reprehenderit natus totam corrupti voluptatem ab harum. Quod repellat, esse quas iure neque porro magni ratione dolores. Sed illo sint explicabo eius perferendis perspiciatis ducimus. Enim, officiis et. Odio sapiente quibusdam itaque harum iusto, voluptatum possimus nesciunt, sed fugiat quos nam aliquid, dolorem repellat nostrum recusandae officia reprehenderit aperiam! Ipsa assumenda, provident ratione nemo debitis illo, rerum, maxime atque omnis alias facilis!',
	},
	{
		atTime: '10s',
		content: 'Siêu nhân không được bỏ cuộc',
	},

	{
		atTime: '13s',
		content: 'Siêu nhân không được bỏ cuộc sức mạnh của tình bạn sẽ mang lại chiến thắng',
	},
];

const Home = () => {
	const [textHighlight, setTextHighlight] = useState<any[]>([]);
	const [selectionState, setSelectionState] = useState<any>();
	const [paragraphs, setParagraphs] = useState<any[]>([]);
	const [typeMenu, setTypeMenu] = useState<string>('SELECT');
	const [correctText, setCorrectText] = useState<string>('');
	const [elementRemove, setElementRemove] = useState<any>();
	const [open, setOpen] = useState<boolean>(false);
	const elementRef = useRef<HTMLElement | null>(null);

	const handleHighlightText = async (e: Event, index: number): Promise<void> => {
		const highlightValue = window.getSelection();
		if (highlightValue && highlightValue.rangeCount > 0 && highlightValue.toString().trim().length > 0) {
			if (listData[index]?.content.includes(highlightValue.toString().trim())) {
				const range = highlightValue.getRangeAt(0);
				setSelectionState({
					index,
					range,
					highlightValue: highlightValue.toString().trim(),
				});
				const temp = highlightValue.toString();
				const selectedText = range.extractContents();
				const span = document.createElement('span');
				span.classList.add('bg-red-600', 'text-blue-300', 'select-none');
				span.appendChild(selectedText);
				range.insertNode(span);
				// console.log('///####', highlightValue);
				// const containerNode = e.target;
				// if (!highlightValue.toString() && containerNode.contains(range.commonAncestorContainer)) {
				// 	span.replaceWith(document.createTextNode(temp));
				// 	return;
				// }
				span.setAttribute('data-value', `${highlightValue.toString().trim()}`);
				span.addEventListener('click', (e) => {
					setOpen(true);
					elementRef.current = e.currentTarget as HTMLElement;
					setTypeMenu('DELETE');
					setElementRemove({
						index,
						element: e.target,
					});
				});
				const newTextHighlight = textHighlight.map((text, i) => {
					if (i === index) {
						return {
							...text,
							selected: [
								...(text?.selected.filter(
									(txt: string) => !highlightValue.toString().trim().includes(txt) || temp.trim().includes(txt),
								) || []),
								highlightValue.toString().trim() || temp.trim(),
							],
						};
					}

					return text;
				});
				setTextHighlight(newTextHighlight);
				setSelectionState(null);

				setTypeMenu('SELECT');
				elementRef.current = span as HTMLElement;
				setOpen(true);
			}
		}
	};

	const handleAddBroll = () => {
		// const selectedText = selectionState.range.extractContents();
		// const span = document.createElement("span");
		// span.classList.add("bg-red-600", "text-blue-300", "select-none");
		// span.appendChild(selectedText);

		// selectionState.range.insertNode(span);
		// span.setAttribute("data-value", `${selectionState.highlightValue.toString().trim()}`);
		// span.addEventListener("click", (e) => {
		// 	setOpen(true);
		// 	elementRef.current = e.currentTarget as HTMLElement;
		// 	setTypeMenu("DELETE");
		// 	setElementRemove({
		// 		index: selectionState.index,
		// 		element: e.target,
		// 	});
		// });

		// const newTextHighlight = textHighlight.map((text, i) => {
		// 	if (i === selectionState.index) {
		// 		return {
		// 			...text,
		// 			rangeStart: selectionState.range.startOffset,
		// 			rangeStartEnd: selectionState.range.endOffset,
		// 			// eslint-disable-next-line no-unsafe-optional-chaining
		// 			selected: [
		// 				// eslint-disable-next-line no-unsafe-optional-chaining
		// 				...text?.selected.filter((txt: string) => !selectionState.highlightValue.toString().trim().includes(txt)),
		// 				selectionState.highlightValue.toString().trim(),
		// 			],
		// 		};
		// 	}

		// 	return text;
		// });
		// setTextHighlight(newTextHighlight);
		setOpen(false);
		setSelectionState(null);
	};

	const handleRemove = (dataRemove: any) => {
		const newTextHighlight = textHighlight.map((text, index) => {
			if (index === dataRemove.index) {
				const parentElement = getParentElement(dataRemove.element);
				const childSpan = parentElement.querySelectorAll('span');
				const valueRemove: string[] = [];
				childSpan.forEach((span: HTMLElement) => {
					valueRemove.push(span.getAttribute('data-value') || '');
					const textNode = document.createTextNode(span.textContent || '');
					span.replaceWith(textNode);
				});
				const textNode = document.createTextNode(parentElement.textContent || '');
				parentElement.replaceWith(textNode);
				valueRemove.push(parentElement.getAttribute('data-value') || '');
				return {
					...text,
					selected: text.selected.filter((txt: string) => valueRemove.includes(txt) === false),
				};
			}

			return text;
		});
		setOpen(false);
		setTextHighlight(newTextHighlight);
	};

	const handleOnClose = () => {
		setOpen(false);
		setTypeMenu('SELECT');
	};

	const handleAddCorrect = () => {
		selectionState.range.deleteContents();
		const textNode = document.createTextNode(correctText);
		selectionState.range.insertNode(textNode);
		const paragraph = document.getElementById(`paragraph_${selectionState.index}`);
		if (paragraph) {
			listData[selectionState.index].content = paragraph.innerText;
		}
		handleOnClose();
		setCorrectText('');
		setSelectionState(null);
	};

	useEffect(() => {
		if (listData && paragraphs.length === 0) {
			const newListText = listData.map((item, index) => {
				const newItem = JSON.parse(
					JSON.stringify({
						...item,
						index,
						selected: [],
					}),
				);

				delete newItem.content;
				return newItem;
			});
			setTextHighlight(newListText);
			setParagraphs(JSON.parse(JSON.stringify(listData)));
		}
	}, [listData]);

	useEffect(() => {
		console.log('text highlight', textHighlight[0]?.selected);
	}, [textHighlight]);

	return (
		<div className="p-4 flex flex-col gap-4">
			{paragraphs.length > 0 &&
				paragraphs.map((item, index) => (
					<HighlightText
						handleHighlightText={handleHighlightText}
						data={item}
						index={index}
						key={`${index}_${item.atTime}`}
					/>
				))}

			<VideoControlCustom src={videoURL} />

			<ImageEditor />
			<Menu
				anchorEl={elementRef.current}
				open={open}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				sx={{
					marginTop: '-20px',
					'& .MuiList-root': {
						display: 'flex',
						gap: '5px',
					},

					'& .MuiList-root  div': {
						backgroundColor: '#fff',
						width: '1px',
						height: 'inherit',
					},
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				PaperProps={{
					style: {
						backgroundColor: '#4C667B',
					},
				}}
				onClose={() => handleOnClose()}
			>
				{typeMenu.length > 0 && typeMenu === 'SELECT' ? (
					<span className="flex gap-3">
						<MenuItem onClick={() => setTypeMenu('CORRECT')}>Correct</MenuItem>
						<div></div>
						<MenuItem onClick={() => handleAddBroll()}>Add B-roll</MenuItem>
					</span>
				) : typeMenu === 'DELETE' ? (
					<MenuItem onClick={() => handleRemove(elementRemove)}>Remove</MenuItem>
				) : typeMenu === 'CORRECT' ? (
					<MenuItem
						sx={{
							position: 'relative',
						}}
					>
						<Box
							component="span"
							sx={{
								position: 'absolute',
								height: '20px',
								width: '20px',
								backgroundColor: 'red',
								borderRadius: '50%',
								color: 'white',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '5px',
								overflow: 'hidden',
								cursor: 'pointer',
								top: '-2px',
								right: '2px',
							}}
							onClick={() => handleOnClose()}
						>
							close
						</Box>
						<input
							type="text"
							value={correctText}
							onChange={(e) => setCorrectText(e.target.value)}
							className="outline-none bg-white rounded-sm p-2 m-2 text-black"
							placeholder="add correct"
						/>
						<Button type="button" onClick={() => handleAddCorrect()}>
							check
						</Button>
					</MenuItem>
				) : null}
			</Menu>
		</div>
	);
};

export default Home;
