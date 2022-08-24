import { FC, useMemo, useState } from "react";
import produce from "immer";
import Sort from "@/components/ui/Sort";
import { sort } from "@/types/types";
import IconButton from "@/components/ui/IconButton";

interface ISortField {
	name: string;
	sort: sort;
}

interface ITableHeader {
	name: string;
	isSortable: boolean;
	width: number;
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
}

export const Table: FC<ITableProps> = ({
	headers,
	data,
	search = "",
	searchField = "",
	width = "",
	contentHeight = "",
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
			return item[searchField].toLowerCase().includes(search.toLowerCase());
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
				<header className="text-xs uppercase text-neutral-light bg-card-light flex pr-[6px]">
					{headers.map((header) => (
						<div
							key={header.name}
							onClick={() => onChangeSort(header)}
							className={[
								header.isSortable ? "cursor-pointer hover:bg-card" : "",
								"py-3 px-6  select-none flex items-center gap-2"
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
					className="overflow-auto bg-card-dark"
				>
					{sortedAndSearchedData.map((item, index) => (
						<div key={"row_" + index} className="flex border-b border-card">
							{headers.map((header, index) => (
								<div
									key={"col_" + index}
									className={[
										"flex items-center justify-start text-neutral overflow-hidden text-ellipsis py-3 px-6 whitespace-nowrap",
										index === 0 ? "text-base font-medium text-text" : ""
									].join(" ")}
									style={{ flex: `${header.width} 1 0` }}
								>
									{item[header.name]}
								</div>
							))}
							<div className="flex-1 flex items-center justify-center">
								<IconButton
									onClick={() => onEdit(item)}
									name="edit"
									color="var(--color-success)"
								/>
								<IconButton
									onClick={() => onDelete(item)}
									name="delete"
									color="var(--color-danger)"
								/>
							</div>
						</div>
					))}
					{!sortedAndSearchedData.length && (
						<div className="h-[inherit] flex items-center justify-center">
							{placeholder}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Table;
