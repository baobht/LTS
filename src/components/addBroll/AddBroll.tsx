import { useRef, useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem, Popper, TextField } from '@mui/material';
import {} from 'react';
import { ScrollView, VideoControlCustom } from '@/components';
import videoURL from '@/assets/videos/video.mp4';
import { BsCheckLg, BsChevronDown, BsCloudDownload } from 'react-icons/bs';
import Folder from '@/assets/imgs/icons/folder.svg';
import Trash from '@/assets/imgs/icons/trash.svg';
import { EPopover } from '@/constants/types';
import { useTextSelection } from '@/utils/customHooks';

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
		content:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae numquam, eius laudantium, deserunt animi doloribus excepturi, illum ratione enim voluptatem voluptates exercitationem quos? Sit aut temporibus perspiciatis, voluptas repudiandae vel? Blanditiis iste corporis hic maxime consequatur eligendi quam quo numquam sunt, nisi explicabo temporibus placeat obcaecati eaque id inventore ducimus vero perspiciatis rem tempora itaque. Veritatis provident illo nam autem velit temporibus facilis voluptas adipisci impedit accusantium, ratione dolorem quis dolor minima suscipit sint tenetur amet aliquid et omnis facere asperiores quas quod fugit? Sed, eaque dolorum molestiae illo minima perspiciatis enim sapiente suscipit voluptas aspernatur sint culpa laborum? Suscipit ab est consequuntur, neque velit necessitatibus provident nemo, perferendis cum aperiam, minima repellat enim. Itaque illo earum alias rem. Debitis, ipsa optio quasi exercitationem vitae vero nihil consequatur, fugiat, ipsam omnis magnam repellat id rerum deleniti! Minima nemo qui quo dolores nulla minus, maiores optio impedit voluptas animi necessitatibus et. Reprehenderit soluta, perspiciatis assumenda quasi error quos dolorem maiores odit pariatur non debitis repellendus suscipit, eum corporis? Doloribus perspiciatis fugiat, deleniti eius neque tenetur odit earum consequatur facere, laudantium autem, nisi eos ab! Quam, modi eaque. Distinctio debitis quasi odio corrupti doloribus saepe quae? Perferendis omnis sint quas voluptatum tenetur.',
	},
];

interface ITextSelectionStore {
	index: number;
	atTime: string;
	selected: string[];
}

const AddBroll = () => {
	const btnPopper = useRef<HTMLButtonElement | null>(null);
	const menuElRef = useRef<HTMLElement | null>(null);
	const newSpanElementsRef = useRef<HTMLSpanElement[]>([]);
	const [openPopper, setOpenPopper] = useState<boolean>(false);
	const [textSelectionStore, setTextSelectionStore] = useState<ITextSelectionStore[]>([]);
	const [selectionState, setSelectionState] = useState<any>();
	const [paragraphs, setParagraphs] = useState<IListData[]>([]);
	const [typeMenu, setTypeMenu] = useState<string>(EPopover.SELECT);
	const [correctText, setCorrectText] = useState<string>('');
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	//new flow
	const { selectionText, isSelecting, range } = useTextSelection();
	const [selectionsRemove, setSelectionsRemove] = useState<any[]>([]);
	const [brollName, setBrollName] = useState<string>('');
	const [renameState, setRenameState] = useState<boolean>(false);

	const handleAddBroll = () => {
		// const selectedText = selectionState.range.extractContents();
		// const span = document.createElement("span");
		// span.classList.add("bg-red-600", "text-blue-300", "select-none");
		// span.appendChild(selectedText);

		// selectionState.range.insertNode(span);
		// span.setAttribute("data-value", `${selectionState.highlightValue.toString().trim()}`);
		// span.addEventListener("click", (e) => {
		// 	setOpen(true);
		// 	menuElRef.current = e.currentTarget as HTMLElement;
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
		setOpenMenu(false);
		setSelectionState(null);
	};

	const handleRemove = (dataRemove: HTMLSpanElement) => {
		const valueRemove: { selected: string; index: number }[] = [];
		textSelectionStore.forEach((__, index) => {
			if (dataRemove.dataset.index && index === +dataRemove.dataset.index) {
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
		const newTextHighlight = textSelectionStore.map((txt, index) => {
			const compArr = compareTextHighlightArr
				.filter((element: any) => element.index === index)
				.map((e: { index: number; selected: string }) => e.selected);
			return {
				...txt,
				selected: txt.selected.filter((ele: any) => !compArr.includes(ele)),
			};
		});
		newSpanElementsRef.current = newSpanElementsRef.current.filter((ele) => !selectionsRemove.includes(ele));
		setTextSelectionStore(newTextHighlight);
		setOpenMenu(false);
		setTypeMenu(EPopover.SELECT);
	};

	const handleOnClose = () => {
		setOpenMenu(false);
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

	const handleRename = () => {
		setOpenPopper(false);
		setRenameState(true);
	};

	useEffect(() => {
		const handleNewSpanClick = (event: any) => {
			menuElRef.current = event.currentTarget as HTMLElement;
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
				menuElRef.current = newSpanElement;

				const newTextHighlight = textSelectionStore.map((text, i) => {
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
				setTextSelectionStore(newTextHighlight);
				setTypeMenu(EPopover.SELECT);
				setOpenMenu(true);
			}
		};
		if (!isSelecting && selectionText && range) {
			handleHighlightText(selectionText, range);
		}
		return () => {
			newSpanElementsRef.current.forEach((span) => span.removeEventListener('click', handleNewSpanClick));
		};
	}, [selectionText, isSelecting, range]);

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
					setOpenMenu(true);
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
			setTextSelectionStore(newListText);
			setParagraphs(JSON.parse(JSON.stringify(listData)));
		}
	}, [listData]);

	return (
		<section className="flex flex-wrap items-center w-screen bg-white px-2 xl:px-12 pb-28">
			<div className="flex flex-wrap-reverse items-center w-full xl:w-9/12">
				<div className="w-full xl:w-2/5 px-2">
					<h2 className="text-center text-black font-bold mb-3 text-2xl select-none">Highlight text to add B-roll</h2>
					<div className="rounded-[18px] flex flex-col items-center bg-[#F8FAFF] max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] py-[17px] pl-8 pr-3">
						<Button
							variant="contained"
							type="button"
							disabled={Boolean(!listData.length)}
							sx={{
								textTransform: 'none',
								marginBottom: '30px',
								borderRadius: '25px',
								outline: 'none !important',
								width: '256.26px',
								maxWidth: '80%',
								bgcolor: '#4285F4;',
								'& .Mui-disabled': {
									bgcolor: '#EAEAEA',
									color: '#879BAC',
								},
							}}
						>
							Add B-Roll
						</Button>
						{paragraphs && paragraphs.length > 0 ? (
							<ScrollView sx="flex flex-col gap-8 pr-[30px] scrollbar_custom scrollbar_small">
								{listData.map((paragraph, index) => (
									<div key={index} className="flex flex-col gap-2 text-black">
										<p className="text-[#879BAC] text-xl select-none">{paragraph.atTime}</p>
										<span id={`paragraph_${index}`}>{paragraph.content}</span>
									</div>
								))}
							</ScrollView>
						) : (
							<div className="w-full h-full flex items-center justify-center grow">
								<svg width="66" height="41" viewBox="0 0 66 41" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect x="0.202515" y="4.4668" width="39.9559" height="5.85524" rx="2.92762" fill="#4285F4" />
									<rect x="0.202515" y="13.3447" width="48.9877" height="5.85524" rx="2.92762" fill="#4285F4" />
									<rect x="0.202515" y="31.1001" width="48.9877" height="5.85524" rx="2.92762" fill="#4285F4" />
									<rect x="0.202515" y="22.2222" width="65.01" height="5.85524" rx="2.92762" fill="#4285F4" />
									<rect x="0.202515" y="0.481445" width="60.7374" height="0.962281" fill="#4285F4" />
									<rect x="0.202515" y="39.978" width="60.7374" height="0.962281" fill="#4285F4" />
								</svg>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col items-center gap-[83px] w-full xl:w-3/5 px-2 max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)]">
					{renameState ? (
						<div className="flex items-center gap-4">
							<TextField
								value={brollName}
								fullWidth
								placeholder="Please enter project name."
								autoFocus
								variant="filled"
								size="small"
								sx={{}}
								// endAdornment={<BsCheckLg />}
								onChange={(e) => setBrollName(e.target.value)}
							/>
							<Button variant="outlined" sx={{ outline: 'none !important' }} onClick={() => setRenameState(false)}>
								<BsCheckLg color="#000" size={30} />
							</Button>
						</div>
					) : (
						<Button
							sx={{
								maxWidth: '60%',
								textTransform: 'none',
								width: 'fit-content',
								color: '#879BAC',
								outline: 'none !important',
							}}
							ref={btnPopper}
							endIcon={<BsChevronDown color="black" />}
							onClick={() => setOpenPopper(!openPopper)}
						>
							<p className="truncate">{brollName || 'Untitled'}</p>
						</Button>
					)}
					<VideoControlCustom src={videoURL} />

					<div className="flex items-center gap-8 justify-center mt-0 xl:mt-12">
						<Button
							variant="outlined"
							type="button"
							disabled={Boolean(!listData.length)}
							sx={{
								textTransform: 'none',
								marginBottom: '30px',
								borderRadius: '25px',
								height: '45px',
								outline: 'none !important',
								width: '121.79px',
								color: '#4285F4',
								borderColor: '#4285F4',
								'& .Mui-disabled': {
									bgcolor: '#EAEAEA',
									color: '#879BAC',
								},
							}}
						>
							Save
						</Button>
						<Button
							variant="contained"
							type="button"
							startIcon={<BsCloudDownload className="" />}
							disabled={Boolean(!listData.length)}
							sx={{
								textTransform: 'none',
								marginBottom: '30px',
								position: 'relative',
								borderRadius: '25px',
								height: '45px',
								outline: 'none !important',
								width: '121.79px',
								bgcolor: '#4285F4',
								'& .Mui-disabled': {
									bgcolor: '#EAEAEA',
									color: '#879BAC',
								},
								'& .MuiButton-startIcon': {
									bgcolor: '#ffff',
									height: '37px',
									width: '37px',
									borderRadius: '50%',
									color: '#4285F4',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'absolute',
									left: '10px',
								},
							}}
						>
							<span className="pl-6">Export</span>
						</Button>
					</div>
				</div>
			</div>
			<div className="w-full p-3 w-full xl:w-3/12 pl-2">
				<div className="w-full px-2">
					<h2 className="text-center text-black font-bold mb-3 text-2xl select-none">B-Roll</h2>
					<div className="rounded-[18px] flex flex-col items-center bg-[#F8FAFF] max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] py-3 pl-6 pr-1">
						{listData && listData.length < 0 ? (
							<ScrollView sx="flex flex-col gap-3 pr-5">
								{listData.map((paragraph, index) => (
									<div key={index} className="flex flex-col gap-3 text-black">
										<p className="text-gray-500 text-xl">{paragraph.atTime}</p>
										<span id={`paragraph_${index}`}>{paragraph.content}</span>
									</div>
								))}
							</ScrollView>
						) : (
							<div className="w-full h-full flex items-center justify-center grow">
								<svg width="132" height="102" viewBox="0 0 132 102" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9.44439 96.3506H7.96239L3.50339 89.6036V96.3506H2.02139V87.3026H3.50339L7.96239 94.0366V87.3026H9.44439V96.3506ZM14.4975 96.4676C13.8215 96.4676 13.2105 96.3159 12.6645 96.0126C12.1185 95.7006 11.6895 95.2673 11.3775 94.7126C11.0655 94.1493 10.9095 93.4993 10.9095 92.7626C10.9095 92.0346 11.0699 91.3889 11.3905 90.8256C11.7112 90.2623 12.1489 89.8289 12.7035 89.5256C13.2582 89.2223 13.8779 89.0706 14.5625 89.0706C15.2472 89.0706 15.8669 89.2223 16.4215 89.5256C16.9762 89.8289 17.4139 90.2623 17.7345 90.8256C18.0552 91.3889 18.2155 92.0346 18.2155 92.7626C18.2155 93.4906 18.0509 94.1363 17.7215 94.6996C17.3922 95.2629 16.9415 95.7006 16.3695 96.0126C15.8062 96.3159 15.1822 96.4676 14.4975 96.4676ZM14.4975 95.1806C14.8789 95.1806 15.2342 95.0896 15.5635 94.9076C15.9015 94.7256 16.1745 94.4526 16.3825 94.0886C16.5905 93.7246 16.6945 93.2826 16.6945 92.7626C16.6945 92.2426 16.5949 91.8049 16.3955 91.4496C16.1962 91.0856 15.9319 90.8126 15.6025 90.6306C15.2732 90.4486 14.9179 90.3576 14.5365 90.3576C14.1552 90.3576 13.7999 90.4486 13.4705 90.6306C13.1499 90.8126 12.8942 91.0856 12.7035 91.4496C12.5129 91.8049 12.4175 92.2426 12.4175 92.7626C12.4175 93.5339 12.6125 94.1319 13.0025 94.5566C13.4012 94.9726 13.8995 95.1806 14.4975 95.1806ZM27.8935 91.7096C28.3789 91.7963 28.7905 92.0519 29.1285 92.4766C29.4665 92.9013 29.6355 93.3823 29.6355 93.9196C29.6355 94.3789 29.5142 94.7949 29.2715 95.1676C29.0375 95.5316 28.6952 95.8219 28.2445 96.0386C27.7939 96.2466 27.2695 96.3506 26.6715 96.3506H23.0575V87.3156H26.5025C27.1179 87.3156 27.6465 87.4196 28.0885 87.6276C28.5305 87.8356 28.8642 88.1173 29.0895 88.4726C29.3149 88.8193 29.4275 89.2093 29.4275 89.6426C29.4275 90.1626 29.2889 90.5959 29.0115 90.9426C28.7342 91.2893 28.3615 91.5449 27.8935 91.7096ZM24.5395 91.1116H26.3725C26.8579 91.1116 27.2349 91.0033 27.5035 90.7866C27.7809 90.5613 27.9195 90.2406 27.9195 89.8246C27.9195 89.4173 27.7809 89.1009 27.5035 88.8756C27.2349 88.6416 26.8579 88.5246 26.3725 88.5246H24.5395V91.1116ZM26.5415 95.1416C27.0442 95.1416 27.4385 95.0203 27.7245 94.7776C28.0105 94.5349 28.1535 94.1969 28.1535 93.7636C28.1535 93.3216 28.0019 92.9706 27.6985 92.7106C27.3952 92.4506 26.9922 92.3206 26.4895 92.3206H24.5395V95.1416H26.5415ZM36.745 91.0206V92.2686H31.402V91.0206H36.745ZM43.5435 96.3506L41.4635 92.7366H40.3325V96.3506H38.8505V87.3156H41.9705C42.6638 87.3156 43.2488 87.4369 43.7255 87.6796C44.2108 87.9223 44.5705 88.2473 44.8045 88.6546C45.0472 89.0619 45.1685 89.5169 45.1685 90.0196C45.1685 90.6089 44.9952 91.1463 44.6485 91.6316C44.3105 92.1083 43.7862 92.4333 43.0755 92.6066L45.3115 96.3506H43.5435ZM40.3325 91.5536H41.9705C42.5252 91.5536 42.9412 91.4149 43.2185 91.1376C43.5045 90.8603 43.6475 90.4876 43.6475 90.0196C43.6475 89.5516 43.5088 89.1876 43.2315 88.9276C42.9542 88.6589 42.5338 88.5246 41.9705 88.5246H40.3325V91.5536ZM50.1714 96.4676C49.4954 96.4676 48.8844 96.3159 48.3384 96.0126C47.7924 95.7006 47.3634 95.2673 47.0514 94.7126C46.7394 94.1493 46.5834 93.4993 46.5834 92.7626C46.5834 92.0346 46.7437 91.3889 47.0644 90.8256C47.385 90.2623 47.8227 89.8289 48.3774 89.5256C48.932 89.2223 49.5517 89.0706 50.2364 89.0706C50.921 89.0706 51.5407 89.2223 52.0954 89.5256C52.65 89.8289 53.0877 90.2623 53.4084 90.8256C53.729 91.3889 53.8894 92.0346 53.8894 92.7626C53.8894 93.4906 53.7247 94.1363 53.3954 94.6996C53.066 95.2629 52.6154 95.7006 52.0434 96.0126C51.48 96.3159 50.856 96.4676 50.1714 96.4676ZM50.1714 95.1806C50.5527 95.1806 50.908 95.0896 51.2374 94.9076C51.5754 94.7256 51.8484 94.4526 52.0564 94.0886C52.2644 93.7246 52.3684 93.2826 52.3684 92.7626C52.3684 92.2426 52.2687 91.8049 52.0694 91.4496C51.87 91.0856 51.6057 90.8126 51.2764 90.6306C50.947 90.4486 50.5917 90.3576 50.2104 90.3576C49.829 90.3576 49.4737 90.4486 49.1444 90.6306C48.8237 90.8126 48.568 91.0856 48.3774 91.4496C48.1867 91.8049 48.0914 92.2426 48.0914 92.7626C48.0914 93.5339 48.2864 94.1319 48.6764 94.5566C49.075 94.9726 49.5734 95.1806 50.1714 95.1806ZM56.8364 86.7306V96.3506H55.3544V86.7306H56.8364ZM60.2641 86.7306V96.3506H58.7821V86.7306H60.2641ZM65.0928 92.7366C65.0928 92.0173 65.2401 91.3803 65.5348 90.8256C65.8381 90.2709 66.2455 89.8419 66.7568 89.5386C67.2768 89.2266 67.8488 89.0706 68.4728 89.0706C69.0361 89.0706 69.5258 89.1833 69.9418 89.4086C70.3665 89.6253 70.7045 89.8983 70.9558 90.2276V89.1876H72.4508V96.3506H70.9558V95.2846C70.7045 95.6226 70.3621 95.9043 69.9288 96.1296C69.4955 96.3549 69.0015 96.4676 68.4468 96.4676C67.8315 96.4676 67.2681 96.3116 66.7568 95.9996C66.2455 95.6789 65.8381 95.2369 65.5348 94.6736C65.2401 94.1016 65.0928 93.4559 65.0928 92.7366ZM70.9558 92.7626C70.9558 92.2686 70.8518 91.8396 70.6438 91.4756C70.4445 91.1116 70.1801 90.8343 69.8508 90.6436C69.5215 90.4529 69.1661 90.3576 68.7848 90.3576C68.4035 90.3576 68.0481 90.4529 67.7188 90.6436C67.3895 90.8256 67.1208 91.0986 66.9128 91.4626C66.7135 91.8179 66.6138 92.2426 66.6138 92.7366C66.6138 93.2306 66.7135 93.6639 66.9128 94.0366C67.1208 94.4093 67.3895 94.6953 67.7188 94.8946C68.0568 95.0853 68.4122 95.1806 68.7848 95.1806C69.1661 95.1806 69.5215 95.0853 69.8508 94.8946C70.1801 94.7039 70.4445 94.4266 70.6438 94.0626C70.8518 93.6899 70.9558 93.2566 70.9558 92.7626ZM73.9034 92.7366C73.9034 92.0173 74.0507 91.3803 74.3454 90.8256C74.6487 90.2709 75.056 89.8419 75.5674 89.5386C76.0874 89.2266 76.6637 89.0706 77.2964 89.0706C77.7644 89.0706 78.2237 89.1746 78.6744 89.3826C79.1337 89.5819 79.4977 89.8506 79.7664 90.1886V86.7306H81.2614V96.3506H79.7664V95.2716C79.5237 95.6183 79.1857 95.9043 78.7524 96.1296C78.3277 96.3549 77.838 96.4676 77.2834 96.4676C76.6594 96.4676 76.0874 96.3116 75.5674 95.9996C75.056 95.6789 74.6487 95.2369 74.3454 94.6736C74.0507 94.1016 73.9034 93.4559 73.9034 92.7366ZM79.7664 92.7626C79.7664 92.2686 79.6624 91.8396 79.4544 91.4756C79.255 91.1116 78.9907 90.8343 78.6614 90.6436C78.332 90.4529 77.9767 90.3576 77.5954 90.3576C77.214 90.3576 76.8587 90.4529 76.5294 90.6436C76.2 90.8256 75.9314 91.0986 75.7234 91.4626C75.524 91.8179 75.4244 92.2426 75.4244 92.7366C75.4244 93.2306 75.524 93.6639 75.7234 94.0366C75.9314 94.4093 76.2 94.6953 76.5294 94.8946C76.8674 95.0853 77.2227 95.1806 77.5954 95.1806C77.9767 95.1806 78.332 95.0853 78.6614 94.8946C78.9907 94.7039 79.255 94.4266 79.4544 94.0626C79.6624 93.6899 79.7664 93.2566 79.7664 92.7626ZM82.7139 92.7366C82.7139 92.0173 82.8612 91.3803 83.1559 90.8256C83.4592 90.2709 83.8666 89.8419 84.3779 89.5386C84.8979 89.2266 85.4742 89.0706 86.1069 89.0706C86.5749 89.0706 87.0342 89.1746 87.4849 89.3826C87.9442 89.5819 88.3082 89.8506 88.5769 90.1886V86.7306H90.0719V96.3506H88.5769V95.2716C88.3342 95.6183 87.9962 95.9043 87.5629 96.1296C87.1382 96.3549 86.6486 96.4676 86.0939 96.4676C85.4699 96.4676 84.8979 96.3116 84.3779 95.9996C83.8666 95.6789 83.4592 95.2369 83.1559 94.6736C82.8612 94.1016 82.7139 93.4559 82.7139 92.7366ZM88.5769 92.7626C88.5769 92.2686 88.4729 91.8396 88.2649 91.4756C88.0656 91.1116 87.8012 90.8343 87.4719 90.6436C87.1426 90.4529 86.7872 90.3576 86.4059 90.3576C86.0246 90.3576 85.6692 90.4529 85.3399 90.6436C85.0106 90.8256 84.7419 91.0986 84.5339 91.4626C84.3346 91.8179 84.2349 92.2426 84.2349 92.7366C84.2349 93.2306 84.3346 93.6639 84.5339 94.0366C84.7419 94.4093 85.0106 94.6953 85.3399 94.8946C85.6779 95.0853 86.0332 95.1806 86.4059 95.1806C86.7872 95.1806 87.1426 95.0853 87.4719 94.8946C87.8012 94.7039 88.0656 94.4266 88.2649 94.0626C88.4729 93.6899 88.5769 93.2566 88.5769 92.7626ZM98.5835 92.5936C98.5835 92.8623 98.5661 93.1049 98.5315 93.3216H93.0585C93.1018 93.8936 93.3141 94.3529 93.6955 94.6996C94.0768 95.0463 94.5448 95.2196 95.0995 95.2196C95.8968 95.2196 96.4601 94.8859 96.7895 94.2186H98.3885C98.1718 94.8773 97.7775 95.4189 97.2055 95.8436C96.6421 96.2596 95.9401 96.4676 95.0995 96.4676C94.4148 96.4676 93.7995 96.3159 93.2535 96.0126C92.7161 95.7006 92.2915 95.2673 91.9795 94.7126C91.6761 94.1493 91.5245 93.4993 91.5245 92.7626C91.5245 92.0259 91.6718 91.3803 91.9665 90.8256C92.2698 90.2623 92.6901 89.8289 93.2275 89.5256C93.7735 89.2223 94.3975 89.0706 95.0995 89.0706C95.7755 89.0706 96.3778 89.2179 96.9065 89.5126C97.4351 89.8073 97.8468 90.2233 98.1415 90.7606C98.4361 91.2893 98.5835 91.9003 98.5835 92.5936ZM97.0365 92.1256C97.0278 91.5796 96.8328 91.1419 96.4515 90.8126C96.0701 90.4833 95.5978 90.3186 95.0345 90.3186C94.5231 90.3186 94.0855 90.4833 93.7215 90.8126C93.3575 91.1333 93.1408 91.5709 93.0715 92.1256H97.0365ZM99.5479 92.7366C99.5479 92.0173 99.6952 91.3803 99.9899 90.8256C100.293 90.2709 100.701 89.8419 101.212 89.5386C101.732 89.2266 102.308 89.0706 102.941 89.0706C103.409 89.0706 103.868 89.1746 104.319 89.3826C104.778 89.5819 105.142 89.8506 105.411 90.1886V86.7306H106.906V96.3506H105.411V95.2716C105.168 95.6183 104.83 95.9043 104.397 96.1296C103.972 96.3549 103.483 96.4676 102.928 96.4676C102.304 96.4676 101.732 96.3116 101.212 95.9996C100.701 95.6789 100.293 95.2369 99.9899 94.6736C99.6952 94.1016 99.5479 93.4559 99.5479 92.7366ZM105.411 92.7626C105.411 92.2686 105.307 91.8396 105.099 91.4756C104.9 91.1116 104.635 90.8343 104.306 90.6436C103.977 90.4529 103.621 90.3576 103.24 90.3576C102.859 90.3576 102.503 90.4529 102.174 90.6436C101.845 90.8256 101.576 91.0986 101.368 91.4626C101.169 91.8179 101.069 92.2426 101.069 92.7366C101.069 93.2306 101.169 93.6639 101.368 94.0366C101.576 94.4093 101.845 94.6953 102.174 94.8946C102.512 95.0853 102.867 95.1806 103.24 95.1806C103.621 95.1806 103.977 95.0853 104.306 94.8946C104.635 94.7039 104.9 94.4266 105.099 94.0626C105.307 93.6899 105.411 93.2566 105.411 92.7626ZM118.677 89.1876L114.283 99.7176H112.749L114.205 96.2336L111.384 89.1876H113.035L115.05 94.6476L117.143 89.1876H118.677ZM126.361 92.5936C126.361 92.8623 126.343 93.1049 126.309 93.3216H120.836C120.879 93.8936 121.091 94.3529 121.473 94.6996C121.854 95.0463 122.322 95.2196 122.877 95.2196C123.674 95.2196 124.237 94.8859 124.567 94.2186H126.166C125.949 94.8773 125.555 95.4189 124.983 95.8436C124.419 96.2596 123.717 96.4676 122.877 96.4676C122.192 96.4676 121.577 96.3159 121.031 96.0126C120.493 95.7006 120.069 95.2673 119.757 94.7126C119.453 94.1493 119.302 93.4993 119.302 92.7626C119.302 92.0259 119.449 91.3803 119.744 90.8256C120.047 90.2623 120.467 89.8289 121.005 89.5256C121.551 89.2223 122.175 89.0706 122.877 89.0706C123.553 89.0706 124.155 89.2179 124.684 89.5126C125.212 89.8073 125.624 90.2233 125.919 90.7606C126.213 91.2893 126.361 91.9003 126.361 92.5936ZM124.814 92.1256C124.805 91.5796 124.61 91.1419 124.229 90.8126C123.847 90.4833 123.375 90.3186 122.812 90.3186C122.3 90.3186 121.863 90.4833 121.499 90.8126C121.135 91.1333 120.918 91.5709 120.849 92.1256H124.814ZM129.548 90.3966V94.3616C129.548 94.6303 129.609 94.8253 129.73 94.9466C129.86 95.0593 130.077 95.1156 130.38 95.1156H131.29V96.3506H130.12C129.453 96.3506 128.942 96.1946 128.586 95.8826C128.231 95.5706 128.053 95.0636 128.053 94.3616V90.3966H127.208V89.1876H128.053V87.4066H129.548V89.1876H131.29V90.3966H129.548Z"
										fill="#4285F4"
									/>
									<path
										d="M79.058 24.1287C79.058 21.6971 79.0874 19.3687 79.0432 17.0403C79.0285 16.2298 79.2053 15.6993 79.9127 15.1688C81.6221 13.9162 81.74 11.3078 80.2958 9.74568C78.778 8.09518 76.258 8.0657 74.7254 9.65726C73.2222 11.2194 73.2959 13.8867 75.0201 15.1393C75.8012 15.714 75.9485 16.3035 75.9338 17.1435C75.8896 19.3835 75.919 21.6087 75.9043 23.8487C75.9043 23.8929 75.8748 23.9371 75.8454 24.055C69.5381 24.055 63.216 24.055 56.8498 24.055C56.8351 23.8929 56.7908 23.7013 56.7908 23.5097C56.7908 21.1077 56.8056 18.6908 56.7761 16.2888C56.7614 15.773 57.0708 15.6256 57.3803 15.4046C59.1635 14.1372 59.5613 11.6909 58.2645 10.0109C56.9235 8.27202 54.5361 7.96255 52.8414 9.31832C50.8372 10.9099 50.9551 13.9751 53.1214 15.434C53.5488 15.7288 53.6667 16.0235 53.6667 16.5098C53.6372 18.9708 53.6519 21.4171 53.6372 23.8782C53.6372 23.9224 53.6077 23.9666 53.5783 24.0697C52.7972 24.1139 52.0014 24.1139 51.2056 24.2024C47.9488 24.6003 45.5468 27.2823 45.5026 30.5686C45.4878 31.7033 45.5173 32.8233 45.4731 33.958C45.4583 34.1938 45.2668 34.5475 45.0457 34.6507C43.8226 35.2843 43.2331 36.257 43.2331 37.6127C43.2331 38.7622 43.2478 39.9264 43.2331 41.0759C43.2184 42.4906 43.8078 43.5221 45.1047 44.1411C45.2962 44.2295 45.4583 44.5832 45.4731 44.8042C45.5173 45.9095 45.4436 47.0147 45.532 48.12C45.812 51.4505 48.5973 53.9999 51.9425 54.0147C55.3614 54.0294 58.7656 54.0147 62.1845 54.0147C62.4497 54.0147 62.715 54.0147 63.0097 54.0147C63.0097 54.8252 63.0097 55.5473 63.0097 56.3725C61.9339 56.3725 60.8876 56.3725 59.8413 56.3725C59.2077 56.3725 58.5592 56.3578 57.9256 56.3725C56.5993 56.402 55.9656 57.0209 55.9066 58.3767C55.8919 58.5536 55.8772 58.7157 55.8624 58.9662C54.3298 58.9662 52.8119 58.9662 51.2941 58.9662C48.3909 58.9662 46.9025 59.8799 45.6499 62.4588C35.6585 55.3704 28.9827 41.1053 32.9174 26.0002C36.8669 10.792 50.7783 0.181581 66.6644 0.255264C82.3 0.328948 96.0346 11.0867 99.8956 26.3981C103.624 41.179 97.0809 55.3262 87.1484 62.4146C86.7505 61.8398 86.4263 61.1914 85.9547 60.6904C84.9084 59.5409 83.5821 58.9957 82.02 58.9957C80.3253 59.0104 78.6306 58.9957 76.8917 58.9957C76.8622 58.7746 76.8327 58.583 76.8327 58.4062C76.8032 57.0799 76.1696 56.4315 74.8285 56.4167C73.3107 56.402 71.778 56.4167 70.2602 56.4167C70.1128 56.4167 69.9802 56.402 69.7739 56.3873C69.7739 55.6357 69.7739 54.9136 69.7739 54.0589C70.0244 54.0589 70.2749 54.0589 70.5402 54.0589C73.8854 54.0589 77.2159 54.0589 80.5611 54.0589C84.4516 54.0589 87.281 51.2294 87.2958 47.3095C87.2958 46.8379 87.3252 46.3663 87.2958 45.9095C87.2073 44.9516 87.2663 44.1853 88.3568 43.6695C89.2115 43.2569 89.4768 42.2843 89.4915 41.3264C89.5063 40.0296 89.521 38.718 89.4915 37.4212C89.4621 36.257 88.9315 35.3286 87.8705 34.8128C87.3989 34.5917 87.3105 34.3265 87.3105 33.8549C87.3105 32.4844 87.3842 31.0844 87.2073 29.7434C86.7652 26.4571 84.0537 24.1729 80.7379 24.1434C80.1927 24.1139 79.6769 24.1287 79.058 24.1287Z"
										fill="#4285F4"
									/>
									<path
										d="M66.3549 48.0167C62.5234 48.0167 58.6918 48.0167 54.8603 48.0167C51.5887 48.0167 49.5846 46.0125 49.5698 42.7557C49.5698 40.2799 49.5698 37.8042 49.5698 35.3137C49.5698 32.3811 51.5887 30.2295 54.5066 30.2148C62.4349 30.1706 70.3633 30.1706 78.2916 30.2148C81.0768 30.2295 83.14 32.3958 83.1547 35.1663C83.1547 37.8189 83.1547 40.4715 83.1547 43.1094C83.1547 45.8504 81.121 47.9725 78.3358 48.002C74.3569 48.0462 70.3485 48.0167 66.3549 48.0167ZM66.2959 45.4967C68.698 45.4673 70.6433 44.5831 72.1759 42.8294C72.3675 42.6083 72.5443 42.1515 72.4559 41.9452C72.3527 41.7389 71.8959 41.6062 71.6012 41.5915C68.1233 41.562 64.6307 41.5768 61.1528 41.5915C60.8581 41.5915 60.3865 41.7389 60.3129 41.9452C60.2244 42.1662 60.4013 42.6083 60.6076 42.8294C62.1107 44.5831 64.0412 45.4525 66.2959 45.4967ZM72.8832 37.2442C73.8117 37.2442 74.519 36.5516 74.519 35.6526C74.519 34.68 73.8117 33.9579 72.8832 33.9579C71.9401 33.9579 71.218 34.6653 71.2033 35.6232C71.1885 36.5221 71.9401 37.2442 72.8832 37.2442ZM61.536 35.5937C61.536 34.6653 60.8434 33.9579 59.915 33.9432C58.9571 33.9284 58.235 34.6358 58.235 35.6084C58.2203 36.5221 58.9866 37.2589 59.9297 37.2589C60.8286 37.2589 61.5507 36.5221 61.536 35.5937Z"
										fill="#4285F4"
									/>
									<path
										d="M55.214 13.3559C54.595 13.3559 54.1382 12.9138 54.1382 12.3096C54.1382 11.7054 54.5803 11.2338 55.1845 11.2191C55.8034 11.2043 56.3339 11.7201 56.3045 12.3243C56.3045 12.899 55.8182 13.3559 55.214 13.3559Z"
										fill="#4285F4"
									/>
									<path
										d="M77.4958 11.2051C78.0705 11.2051 78.5716 11.7209 78.5568 12.2956C78.5421 12.8998 78.1 13.3566 77.4811 13.3566C76.8474 13.3714 76.3611 12.8851 76.3758 12.2514C76.4053 11.6767 76.9211 11.2051 77.4958 11.2051Z"
										fill="#4285F4"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>
			</div>
			<Popper
				open={openPopper}
				anchorEl={btnPopper.current}
				sx={{
					boxShadow: '2px 2px 10px #000',
					borderRadius: '8px',
					position: 'relative',
					marginTop: '20px',
				}}
				popperOptions={{
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 10],
							},
						},
					],
				}}
			>
				<Box component="ul" sx={{ border: 1, p: 1, bgcolor: 'background.paper', borderRadius: '8px' }}>
					<Box
						component="div"
						sx={{
							width: 0,
							height: 0,
							borderLeft: '8px solid transparent',
							borderRight: '8px solid transparent',
							borderBottom: '15px solid white',
							position: 'absolute',
							top: '-10px',
							right: '15px',
						}}
					></Box>
					<Box component="li">
						<Button
							sx={{
								textTransform: 'none',
								outline: 'none !important',
								marginBottom: '8px',
								color: '#000',
							}}
							startIcon={<img src={Folder} draggable={false} loading="lazy" />}
							onClick={handleRename}
						>
							Rename
						</Button>
					</Box>
					<Box component="li">
						<Button
							sx={{
								textTransform: 'none',
								outline: 'none !important',
								marginBottom: '8px',
								color: '#000',
							}}
							startIcon={<img src={Trash} draggable={false} loading="lazy" />}
						>
							Delete
						</Button>
					</Box>
				</Box>
			</Popper>

			<Menu
				anchorEl={menuElRef.current}
				open={openMenu}
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
						backgroundColor: '#4D667B',
					},
				}}
				onClose={handleOnClose}
			>
				{typeMenu.length > 0 && typeMenu === EPopover.SELECT ? (
					<span className="flex gap-3">
						<MenuItem onClick={() => setTypeMenu(EPopover.CORRECT)}>Correct</MenuItem>
						<div></div>
						<MenuItem onClick={handleAddBroll}>Add B-roll</MenuItem>
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
						<Button type="button" onClick={handleAddCorrect}>
							check
						</Button>
					</MenuItem>
				) : null}
			</Menu>
		</section>
	);
};

export default AddBroll;
