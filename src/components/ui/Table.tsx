import { FC, useMemo, useState } from "react";
import produce from "immer";
import Sort from "@/components/ui/Sort";
import { sort } from "@/types/types";
import IconButton from "@/components/ui/IconButton";
import loadingSVG from "@/assets/loading.svg";
import Avatar from "./Avatar";
import SearchCell from "./SearchCell";

interface ISortField {
	name: string;
	sort: sort;
}

interface ITableHeader {
	name: string;
	isSortable: boolean;
	width: number;
	image?: string;
}

interface ITableProps {
	headers: ITableHeader[];
	data: any[];
	search?: string;
	searchField?: string;
	width?: string;
	contentHeight?: string;
	onEdit?: (item: any) => void;
	onDelete?: (item: any) => void;
	placeholder?: string;
	loading?: boolean;
	imageProp?: string;
}

export const Table: FC<ITableProps> = ({
	headers,
	data,
	search = "",
	searchField = "",
	width = "",
	contentHeight = "",
	loading,
	imageProp,
	onEdit = () => {},
	onDelete = () => {},
	placeholder = "No data"
}) => {
	const [sortField, setSortField] = useState<ISortField>({
		name: headers[0].name,
		sort: "asc"
	});

	const sortedData = useMemo(() => {
		return [...data].sort((a, b) => {
			return sortField.sort === "desc"
				? b[sortField.name].localeCompare(a[sortField.name])
				: a[sortField.name].localeCompare(b[sortField.name]);
		});
	}, [data, sortField.name, sortField.sort]);

	const sortedAndSearchedData = useMemo(() => {
		if (!searchField || !search) return sortedData;

		return sortedData.filter((item) => {
			let index = headers.reduce((acc, header) => {
				return (acc += item[header.name]
					.toLowerCase()
					.includes(search.toLowerCase()));
			}, 0);

			return index;
		});
	}, [sortedData, search]);

	const onChangeSort = ({ name, isSortable }: ITableHeader) => {
		if (!isSortable) return;

		setSortField(
			produce((sortField) => {
				if (sortField.name === name) {
					sortField.sort = sortField.sort === "asc" ? "desc" : "asc";
				} else {
					sortField.name = name;
					sortField.sort = "asc";
				}
			})
		);
	};

	return (
		<div className="w-full overflow-x-auto shadow-md rounded-lg">
			<div style={{ width }} className="text-sm">
				<header className="select-none text-xs uppercase text-neutral-light bg-card-light flex pr-[6px]">
					{headers.map((header) => (
						<div
							key={header.name}
							onClick={() => onChangeSort(header)}
							className={[
								header.isSortable ? "cursor-pointer hover:bg-card" : "",
								"flex items-center gap-2 cell"
							].join(" ")}
							style={{ flex: `${header.width} 1 0%` }}
						>
							<span>{header.name}</span>
							{header.isSortable && (
								<Sort
									sort={sortField.name === header.name ? sortField.sort : null}
								/>
							)}
						</div>
					))}
					<div className="flex-1"></div>
				</header>
				<div
					style={{ height: contentHeight }}
					className="relative overflow-auto bg-card-dark"
				>
					{sortedAndSearchedData.map((item, index) => (
						<div key={"row_" + index} className="flex border-b border-card">
							<div
								key="col_0"
								className="text-base font-medium text-text flex items-center cell"
								style={{ flex: `${headers[0].width} 1 0` }}
							>
								{imageProp && <Avatar src={item[imageProp]} />}
								<span className="ml-2">
									<SearchCell search={search} value={item[headers[0].name]} />
								</span>
							</div>
							{headers.slice(1).map((header, index) => (
								<div
									key={"col_" + index + 1}
									className="flex items-center justify-start text-neutral cell"
									style={{ flex: `${header.width} 1 0` }}
								>
									<SearchCell search={search} value={item[header.name]} />
								</div>
							))}
							<div className="flex-1 flex items-center justify-center">
								<IconButton
									title="edit"
									onClick={() => onEdit(item)}
									name="pencil"
									color="var(--color-success)"
								/>
								<IconButton
									title="delete"
									onClick={() => onDelete(item)}
									name="delete"
									color="var(--color-danger)"
								/>
							</div>
						</div>
					))}
					{!loading && !sortedAndSearchedData.length && (
						<div className="h-full flex items-center justify-center">
							{placeholder}
						</div>
					)}
					<div
						style={{ display: loading ? "flex" : "none" }}
						className="bg-black/40 absolute inset-0 w-full h-full items-center justify-center"
					>
						<img width={24} height={24} src={loadingSVG} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
