import { sort } from "@/types/types";
import { FC, memo } from "react";

interface ISortProps {
	sort: sort;
}

export const Sort: FC<ISortProps> = ({ sort }) => {
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="8"
				height="6"
				fill={sort === "desc" ? "var(--color-danger)" : "currentColor"}
				viewBox="0 0 321 193"
			>
				<path d="M292.36 192.027H27.6601C3.05514 192.027 -9.22886 162.227 8.11914 144.927L140.62 8.107C145.98 2.701 153.015 0 160.07 0C167.13 0 174.194 2.701 179.6 8.107L311.9 144.907C329.25 162.247 316.96 192.027 292.36 192.027Z" />
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="8"
				height="6"
				fill={sort === "asc" ? "var(--color-danger)" : "currentColor"}
				viewBox="0 0 321 193"
				className="rotate-180"
			>
				<path d="M292.36 192.027H27.6601C3.05514 192.027 -9.22886 162.227 8.11914 144.927L140.62 8.107C145.98 2.701 153.015 0 160.07 0C167.13 0 174.194 2.701 179.6 8.107L311.9 144.907C329.25 162.247 316.96 192.027 292.36 192.027Z" />
			</svg>
		</div>
	);
};

export default memo(Sort);
