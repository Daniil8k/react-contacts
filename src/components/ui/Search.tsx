import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";
import Icon from "./Icon";

interface ISearchProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	className?: string;
}

export const Search: FC<ISearchProps> = ({
	value,
	setValue,
	className,
	placeholder = "",
	...inputProps
}) => {
	return (
		<div className={["relative", className ? className : ""].join(" ")}>
			<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<Icon name="search" />
			</div>
			<input
				className="pl-10 input"
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder ? placeholder : "Search"}
				{...inputProps}
			/>
		</div>
	);
};

export default Search;
