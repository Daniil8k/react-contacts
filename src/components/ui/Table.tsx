import { FC, useMemo, useState } from "react";
import produce from "immer";
import Sort from "./Sort";
import { sort } from "@/types/types";

interface ISortField {
	name: string;
	sort: sort;
}

interface ITableHeader {
	name: string;
	isSortable: boolean;
}

interface ITableRow {
	[key: string]: string;
}

interface ITableProps {
	headers: ITableHeader[];
	tableData: ITableRow[];
	search: string;
	searchField: string;
}

export const Table: FC<ITableProps> = ({
	headers,
	tableData,
	search,
	searchField
}) => {
	const [sortField, setSortField] = useState<ISortField>({
		name: headers[0].name,
		sort: "asc"
	});

	const sortedData = useMemo(() => {
		return [...tableData].sort((a, b) => {
			return sortField.sort === "desc"
				? b[sortField.name].localeCompare(a[sortField.name])
				: a[sortField.name].localeCompare(b[sortField.name]);
		});
	}, [tableData, sortField.name, sortField.sort]);

	const sortedAndSearchedData = useMemo(() => {
		return sortedData.filter((item) => {
			return item[searchField].toLowerCase().includes(search.toLowerCase());
		});
	}, [sortedData, search]);

	const onChangeSort = (name: string) => {
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
		<div className="min-w-[650px] max-w-[800px] overflow-x-auto relative shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{headers.map((header) => (
							<th
								onClick={onChangeSort.bind(this, header.name)}
								scope="col"
								className={[
									"py-3 px-6 select-none",
									header.isSortable ? "cursor-pointer hover:bg-gray-600" : ""
								].join(" ")}
								key={header.name}
							>
								<div className="flex items-center gap-2">
									<span>{header.name}</span>
									{header.isSortable && (
										<Sort
											sort={
												sortField.name === header.name ? sortField.sort : null
											}
										/>
									)}
								</div>
							</th>
						))}
						<th scope="col" className="py-3 px-6">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedAndSearchedData.map((row, index) => (
						<tr
							key={"row_" + index}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
						>
							{headers.map((header, index) => (
								<td
									key={"col_" + index}
									className={[
										"py-4 px-6 whitespace-nowrap",
										index === 0
											? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
											: ""
									].join(" ")}
								>
									{row[header.name]}
								</td>
							))}
							<td className="py-4 px-6 flex gap-2 justify-end">
								<button className="p-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="green"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
										/>
									</svg>
								</button>
								<button className="p-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="red"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
