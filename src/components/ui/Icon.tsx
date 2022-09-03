import { FC, memo } from "react";
import { Icon as Iconify } from "@iconify/react";
import { ESizes, sizeType } from "@/utils/constants";

export interface IconProps {
	name: string;
	size?: sizeType;
	color?: string;
	className?: string;
	isVisible?: boolean;
}

const Icon: FC<IconProps> = ({
	name,
	size = "default",
	color = "var(--color-neutral)",
	className,
	isVisible = true
}) => {
	return (
		<Iconify
			icon={`mdi-light:${name}`}
			className={className}
			style={{
				fontSize: ESizes[size] + "px",
				opacity: isVisible ? 1 : 0,
				color
			}}
		/>
	);
};

export default memo(Icon);
