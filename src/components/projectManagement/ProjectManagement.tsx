import { useState } from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataTable, ProjectCard } from '@/components';

const ProjectManagement = () => {
	const [isActive, setIsActive] = useState<boolean>(true),
		[page, setPage] = useState<number>(1),
		[pageSize, setPageSize] = useState<number>(10);

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Project Name',
			headerClassName: 'font-bold text-xl text-[#879bac]',
			flex: 1,
			renderCell: () => (
				<p className="flex items-center gap-2 w-full">
					<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M16.5425 17.6895H9.54248"
							stroke="#4285F4"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M16.5425 13.6895H13.5425"
							stroke="#4285F4"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M21.0425 14.6895C21.0425 18.4607 21.0425 20.3464 19.7977 21.5179C18.5529 22.6895 16.5494 22.6895 12.5425 22.6895H11.7698C8.50855 22.6895 6.87794 22.6895 5.74555 21.8917C5.4211 21.6631 5.13306 21.392 4.89018 21.0866C4.04248 20.0208 4.04248 18.4861 4.04248 15.4168V12.8713C4.04248 9.9081 4.04248 8.42651 4.51142 7.2432C5.26529 5.34087 6.85962 3.84033 8.88084 3.1308C10.1381 2.68945 11.7123 2.68945 14.8607 2.68945C16.6598 2.68945 17.5593 2.68945 18.2777 2.94165C19.4327 3.3471 20.3437 4.20455 20.7745 5.29159C21.0425 5.96777 21.0425 6.81439 21.0425 8.50763V14.6895Z"
							stroke="#4285F4"
							stroke-width="1.5"
							stroke-linejoin="round"
						/>
						<path
							d="M4.04248 12.6895C4.04248 10.8486 5.53486 9.35612 7.37581 9.35612C8.0416 9.35612 8.82652 9.47278 9.47385 9.29933C10.049 9.14521 10.4982 8.69597 10.6524 8.12081C10.8258 7.47349 10.7092 6.68857 10.7092 6.02278C10.7092 4.18183 12.2016 2.68945 14.0425 2.68945"
							stroke="#4285F4"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					đâsdsads
				</p>
			),
		},
		{
			field: 'duration',
			headerName: 'Duration',
			headerClassName: 'font-bold text-xl text-[#879bac]',
			minWidth: 130,
			flex: 1,
		},
		{
			field: 'storage',
			headerName: 'Storage',
			headerClassName: 'font-bold text-xl text-[#879bac]',
			minWidth: 130,
			flex: 1,
		},
		{
			field: 'date',
			headerClassName: 'font-bold text-xl text-[#879bac]',
			headerName: 'Date',
			minWidth: 90,
			flex: 1,
		},
		{
			field: 'actions',
			headerClassName: 'font-bold text-xl text-[#879bac]',
			headerName: 'More',
			description: 'This column has a value getter and is not sortable.',
			sortable: false,
			minWidth: 160,
			flex: 1,
		},
	];
	return (
		<section className="bg-white px-[50px] pb-11">
			<div className="flex items-center justify-between mb-20">
				<div className="flex items-center gap-12">
					<h2 className="text-black font-bold text-3xl">Profile</h2>
					<div className="flex items-center gap-1">
						<Button
							sx={{
								outline: 'none !important',
								width: 'fit-content',
							}}
							onClick={() => setIsActive(false)}
						>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M1.16333 19.7734V5.77344H15.1633V19.7734H1.16333ZM17.1633 11.7734V5.77344H23.1633V11.7734H17.1633ZM19.1633 9.77344H21.1633V7.77344H19.1633V9.77344ZM3.16333 17.7734H13.1633V7.77344H3.16333V17.7734ZM4.16333 15.7734H12.1633L9.53833 12.2734L7.66333 14.7734L6.28833 12.9484L4.16333 15.7734ZM17.1633 19.7734V13.7734H23.1633V19.7734H17.1633ZM19.1633 17.7734H21.1633V15.7734H19.1633V17.7734Z"
									fill={isActive ? '#879BAC' : 'black'}
								/>
							</svg>
						</Button>
						<Button
							sx={{
								outline: 'none !important',
								width: 'fit-content',
							}}
							onClick={() => setIsActive(true)}
						>
							<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_251_380)">
									<path
										d="M0.162842 14.2734H7.66284V21.7734H0.162842V14.2734ZM1.66284 20.2734H6.16284V15.7734H1.66284V20.2734ZM0.162842 3.77344H7.66284V11.2734H0.162842V3.77344ZM1.66284 9.77344H6.16284V5.27344H1.66284V9.77344ZM24.1628 5.27344V6.77344H10.6628V5.27344H24.1628ZM19.6628 9.77344H10.6628V8.27344H19.6628V9.77344ZM10.6628 15.7734H24.1628V17.2734H10.6628V15.7734ZM10.6628 18.7734H19.6628V20.2734H10.6628V18.7734Z"
										fill={isActive ? 'black' : '#879BAC'}
									/>
								</g>
								<defs>
									<clipPath id="clip0_251_380">
										<rect width="24" height="24" fill="white" transform="translate(0.162842 0.773438)" />
									</clipPath>
								</defs>
							</svg>
						</Button>
					</div>
				</div>
				<Button
					sx={{
						outline: 'none !important',
						textTransform: 'capitalize',
					}}
					variant="contained"
				>
					New Project
				</Button>
			</div>
			{isActive ? (
				<div className="flex flex-wrap gap-28 items-center">
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
				</div>
			) : (
				<div className="w-screen h-screen">
					<DataTable rows={[]} columns={columns} pageSize={pageSize} page={page} />
				</div>
			)}
		</section>
	);
};

export default ProjectManagement;
