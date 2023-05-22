import videoURL from '@/assets/videos/video.mp4';
import { HighlightText, ImageEditor, VideoControlCustom } from '@/components';
import { EPopover } from '@/constants/types';
import { useTextSelection } from '@/utils/customHooks';
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
	const [typeMenu, setTypeMenu] = useState<string>(EPopover.SELECT);
	const [correctText, setCorrectText] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);

	//new
	const { selectionText, isSelecting, range } = useTextSelection();
	const elementRef = useRef<HTMLElement | null>(null);
	const newSpanElementsRef = useRef<HTMLSpanElement[]>([]);
	const [selectionsRemove, setSelectionsRemove] = useState<any[]>([]);

	useEffect(() => {
		const handleNewSpanClick = (event: any) => {
			elementRef.current = event.currentTarget as HTMLElement;
		};
		const handleHighlightText = (selectionText: string, range: Range) => {
			listData.find((data) => data?.content.includes(selectionText));
			if (
				listData.find((data) => data?.content.includes(selectionText)) &&
				(range.endContainer.parentNode as HTMLElement)?.id
			) {
				const index = +(range.endContainer.parentNode as HTMLElement).id?.split('_')?.[1];
				const temp = selectionText;
				const extractContents = range.extractContents();
				const newSpanElement = document.createElement('span');
				newSpanElement.classList.add('text-blue-300', 'select-none');
				newSpanElement.setAttribute('data-selection', selectionText);
				newSpanElement.setAttribute('data-index', `${index}`);
				newSpanElement.addEventListener('click', handleNewSpanClick);
				newSpanElement.appendChild(extractContents);
				range.insertNode(newSpanElement);
				newSpanElementsRef.current.push(newSpanElement);
				elementRef.current = newSpanElement;

				const newTextHighlight = textHighlight.map((text, i) => {
					if (i === index) {
						return {
							...text,
							selected: [
								...(text?.selected.filter(
									(txt: string) => !selectionText.includes(txt) || !temp.trim().includes(txt),
								) || []),
								selectionText || temp.trim(),
							],
						};
					}

					return text;
				});
				setTextHighlight(newTextHighlight);
				setTypeMenu(EPopover.SELECT);
				setOpen(true);
			}
		};
		if (!isSelecting && selectionText && range) {
			handleHighlightText(selectionText, range);
		}
		return () => {
			newSpanElementsRef.current.forEach((span) => span.removeEventListener('click', handleNewSpanClick));
		};
	}, [selectionText, isSelecting, range, selectionsRemove]);

	useEffect(() => {
		const handleToggleSelection = (e: Event) => {
			setSelectionsRemove((pre) => {
				if ([...pre].includes(e.target)) {
					(e.target as Element)?.classList.remove('bg-blue-300', 'text-white', 'rounded-md');
					setTypeMenu(EPopover.SELECT);
					return [...pre].filter((ele) => ele !== e.target);
				} else {
					(e.target as Element)?.classList.add('bg-blue-300', 'text-white', 'rounded-md');
					setTypeMenu(EPopover.DELETE);
					setOpen(true);
					return [...pre, e.target];
				}
			});
		};
		if (newSpanElementsRef?.current.length) {
			newSpanElementsRef.current.forEach((ele) => {
				ele.addEventListener('click', handleToggleSelection);
			});
		}
		return () => {
			newSpanElementsRef.current.forEach((ele) => {
				ele.removeEventListener('click', handleToggleSelection);
			});
		};
	}, [newSpanElementsRef?.current.length]);

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
		const valueRemove: { selected: string; index: number }[] = [];
		textHighlight.forEach((__, index) => {
			if (index === +dataRemove.dataset.index) {
				const childSpan = dataRemove.querySelectorAll('span');
				childSpan.forEach((span: HTMLElement) => {
					valueRemove.push({
						selected: span.getAttribute('data-selection') || '',
						index: Number(span.dataset.index) || 0,
					});
					const textNode = document.createTextNode(span.textContent || '');
					span.replaceWith(textNode);
				});
				const textNode = document.createTextNode(dataRemove.textContent || '');
				dataRemove.replaceWith(textNode);
				valueRemove.push({
					selected: dataRemove.getAttribute('data-selection') || '',
					index: +dataRemove.dataset.index,
				});
			}
		});

		return valueRemove;
	};

	const handleRemoveMultiple = () => {
		const compareTextHighlightArr = selectionsRemove.reduce((total, current) => {
			const newValueRemove = handleRemove(current);
			return [...total, ...newValueRemove];
		}, []);
		const newTextHighlight = textHighlight.map((txt, index) => {
			const compArr = compareTextHighlightArr
				.filter((element: any) => element.index === index)
				.map((e: { index: number; selected: string }) => e.selected);
			return {
				...txt,
				selected: txt.selected.filter((ele: any) => !compArr.includes(ele)),
			};
		});
		newSpanElementsRef.current = newSpanElementsRef.current.filter((ele) => !selectionsRemove.includes(ele));
		setTextHighlight(newTextHighlight);
		setOpen(false);
		setTypeMenu(EPopover.SELECT);
	};

	const handleOnClose = () => {
		setOpen(false);
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

	return (
		<div className="p-4 flex flex-col gap-4">
			{paragraphs.length > 0 &&
				paragraphs.map((item, index) => (
					<HighlightText
						// handleHighlightText={handleHighlightText}
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
				onClose={handleOnClose}
			>
				{typeMenu.length > 0 && typeMenu === EPopover.SELECT ? (
					<span className="flex gap-3">
						<MenuItem onClick={() => setTypeMenu(EPopover.CORRECT)}>Correct</MenuItem>
						<div></div>
						<MenuItem onClick={() => handleAddBroll()}>Add B-roll</MenuItem>
					</span>
				) : typeMenu === EPopover.DELETE ? (
					<MenuItem onClick={handleRemoveMultiple}>Remove</MenuItem>
				) : typeMenu === EPopover.CORRECT ? (
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
							onClick={handleOnClose}
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
