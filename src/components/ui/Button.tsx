import { ButtonHTMLAttributes, FC, memo } from "react";
import loadingSVG from "@/assets/loading.svg";

type size = "md";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: string;
	loading?: boolean;
	size?: size;
}

export const Button: FC<IButtonProps> = ({
	className = "",
	children = "",
	loading,
	size,
	...btnProps
}) => {
	return (
		<button
			className={["btn", className, size === "md" ? "w-32" : ""].join(" ")}
			{...btnProps}
		>
			{!loading && children}
			{loading !== undefined && (
				<img
					style={{ display: loading ? "block" : "none" }}
					width={24}
					height={24}
					src={loadingSVG}
				/>
			)}
		</button>
	);
};

export default memo(Button);
