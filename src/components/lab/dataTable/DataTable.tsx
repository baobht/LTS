/* eslint-disable @typescript-eslint/ban-types */
import { Stack } from '@mui/material';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

// import noDataTable from '../../assets/icon/noDataTable.svg';
interface IDataTable {
	classNameCustom?: string;
	rows: any[];
	columns: any[];
	pageSize: number;
	page: number;
	rowCount?: number;
	pagination?: any;
	onPageChange?: Function;
	onPageSizeChange?: Function;
	loading?: boolean;
	onSelectRow?: any;
	sxCustom?: {};
	// ...rest
}

const DataTable = ({
	classNameCustom,
	rows,
	columns,
	pageSize,
	page,
	rowCount,
	pagination,
	onPageChange,
	onPageSizeChange,
	loading,
	onSelectRow,
	sxCustom,
	...rest
}: IDataTable) => {
	return (
		<>
			<div className={`grow overflow-x-auto mt-20 background-white min-h-[0] ${classNameCustom} br-15`}>
				<DataGrid
					sx={{
						position: 'unset',
						border: 'none',
						'& .MuiDataGrid-columnHeader': {
							backgroundColor: '#FAFAFA',
						},
						// '& .MuiDataGrid-main': {
						//   borderBottom: '1px solid #F1F1F1',
						// },
						'& .MuiTablePagination-select': {
							minHeight: 'unset',
						},
						'& .MuiDataGrid-row:hover .remove-column': {
							display: 'block !important',
						},
						'& .MuiDataGrid-row .remove-column': {
							display: 'none!important',
						},
						'& .MuiTablePagination-root': {
							// eslint-disable-next-line no-negated-condition
							display: !rows?.length ? 'none!important' : '',
						},
						'& .MuiDataGrid-virtualScroller': {
							overflowY: 'scroll !important',
						},
						'& .MuiDataGrid-virtualScrollerContent': {
							minHeight: '20em!important',
						},
						'.MuiDataGrid-overlay': {
							height: 'auto !important',
						},
						'& .Mui-checked': {
							color: 'rgb(30,41,59)',
						},
						'& .MuiDataGrid-columnSeparator': {
							display: 'none',
						},
						'& .MuiDataGrid-cell': {
							maxHeight: '100%!important',
							position: 'relative',
							whiteSpace: 'normal !important',

							'&::after': {
								position: 'absolute',
								content: '""',
								left: 0,
								width: '1px',
								height: '35%',
								borderRight: '1px solid #e5e5e5',
							},
						},
						'& .MuiDataGrid-row': {
							maxHeight: '100%!important',
						},
						...sxCustom,
					}}
					componentsProps={{
						pagination: {
							labelRowsPerPage: 'Số hàng hiển thị: ',
						},
					}}
					components={{
						NoRowsOverlay: () => (
							<GridOverlay
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									minHeight: '20em',
								}}
							>
								<Stack alignItems="center" justifyContent="center" spacing={2}>
									{/* <img src={`${noDataTable}`} alt="logo" className="w-[10em] h-full block" /> */}
									<p>No Data</p>
								</Stack>
							</GridOverlay>
						),
						NoResultsOverlay: () => (
							<GridOverlay
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									height: '100%',
									minHeight: '20em',
								}}
							>
								<Stack alignItems="center" justifyContent="center" spacing={2}>
									{/* <img src={`${noDataTable}`} alt="logo" className="w-[10em] h-full block" /> */}
									<p>No Data</p>
								</Stack>
							</GridOverlay>
						),
					}}
					className="h-[100%!important] hidden-icon-sorting"
					rows={rows || []}
					columns={columns}
					page={page || 0}
					pageSize={pageSize || 10}
					onPageChange={onPageChange}
					onPageSizeChange={onPageSizeChange}
					rowsPerPageOptions={[5, 10, 20]}
					autoHeight={true}
					disableSelectionOnClick
					pagination={pagination}
					rowCount={rowCount}
					loading={loading}
					hideFooterSelectedRowCount={true}
					keepNonExistentRowsSelected
					onSelectionModelChange={(item: any) => onSelectRow(item)}
					scrollbarSize={20}
					disableVirtualization
					{...rest}
				/>
			</div>
		</>
	);
};

export default DataTable;
