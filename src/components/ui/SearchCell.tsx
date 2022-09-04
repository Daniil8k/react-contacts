import { FC, memo } from "react";

interface ISearchCellProps {
	value: any;
	search: string;
}

export const SearchCell: FC<ISearchCellProps> = ({ search, value }) => {
	let index = value.toLowerCase().indexOf(search.toLowerCase());

	if (index === -1) {
		return <span>{value}</span>;
	}

	return (
		<span>
			<span>{value.slice(0, index)}</span>
			<mark className="bg-warning">
				{value.slice(index, index + search.length)}
			</mark>
			<span>{value.slice(index + search.length)}</span>
		</span>
	);
};

export default memo(SearchCell);
