import { Button } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import { BsChevronRight, BsChevronDown } from 'react-icons/bs';
import { StripeCard } from '..';

const data = [
	{
		id: 1,
		type: 'starter',
		price: 9,
		maxTime: 30,
	},
	{
		id: 2,
		type: 'creator',
		price: 24,
		maxTime: 60,
	},
	{
		id: 3,
		type: 'pro',
		price: 99,
		maxTime: 600,
	},
];

const Pricing = () => {
	return (
		<section className="w-full h-full bg-white text-black">
			<div className="w-full flex items-center justify-between mb-20">
				<h2 className="font-bold text-3xl">Subscription</h2>
				<Button className="!outline-none !bg-primary !capitalize !rounded-[10px] !text-white !py-4 !px-12 !text-lg">
					New Project
				</Button>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-9 mb-32">
				{data.length > 0 && data.map((item, index) => <StripeCard data={item} key={`${item?.type}_${index}`} />)}
			</div>
			<div className="flex flex-col gap-7 w-full items-center justify-center text-black">
				<h2 className="font-bold !font-sans uppercase text-center text-3xl">FQA</h2>

				<TreeView
					aria-label="file system navigator"
					defaultCollapseIcon={<BsChevronDown />}
					defaultExpandIcon={<BsChevronRight />}
					className="!w-full !max-w-[600px] !text-lg !font-normal"
				>
					<TreeItem nodeId="1" label="How much does B-rollify cost?">
						<TreeItem
							nodeId="2"
							sx={{
								'& .MuiTreeItem-label': {
									fontSize: '12px',
								},
							}}
							label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						/>
					</TreeItem>
					<TreeItem nodeId="3" label="What export formats does B-rollify support?">
						<TreeItem
							nodeId="4"
							sx={{
								'& .MuiTreeItem-label': {
									fontSize: '12px',
								},
							}}
							label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						/>
					</TreeItem>
					<TreeItem nodeId="5" label="Can I buy as a perpetual license?">
						<TreeItem
							nodeId="6"
							sx={{
								'& .MuiTreeItem-label': {
									fontSize: '12px',
								},
							}}
							label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						/>
					</TreeItem>
					<TreeItem nodeId="7" label="How much does cost for students and teachers?">
						<TreeItem
							nodeId="8"
							sx={{
								'& .MuiTreeItem-label': {
									fontSize: '12px',
								},
							}}
							label="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
						/>
					</TreeItem>
				</TreeView>
			</div>
		</section>
	);
};

export default Pricing;
