import { ButtonHTMLAttributes, FC } from "react";
import loadingSVG from "@/assets/loading.svg";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: string;
	loading?: boolean;
}

export const Button: FC<IButtonProps> = ({
	className = "",
	children = "",
	loading,
	...btnProps
}) => {
	return (
		<button className={["btn", className].join(" ")} {...btnProps}>
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

export default Button;
