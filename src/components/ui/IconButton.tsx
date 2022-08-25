import { ButtonHTMLAttributes, FC, memo } from "react";
import Icon, { IconProps } from "./Icon";

interface IconButtonProps
	extends IconProps,
		ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	className?: string;
	isLoading?: boolean;
	onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
	onClick,
	isLoading = false,
	name,
	className = "",
	...iconProps
}) => {
	return (
		<button
			className={[
				"cursor-pointer border border-transparent hover:border-neutral rounded-md p-1",
				isLoading ? "rotate-anim cursor-default" : "",
				className
			].join(" ")}
			onClick={onClick}
			disabled={isLoading}
		>
			{<Icon name={isLoading ? "refresh" : name} {...iconProps} />}
		</button>
	);
};

export default memo(IconButton);
