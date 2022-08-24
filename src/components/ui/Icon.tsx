import { FC } from "react";
import { Icon } from "@iconify/react";
import { ESizes, sizeType } from "@/utils/constants";

export interface IconProps {
	name: string;
	size?: sizeType;
	color?: string;
	className?: string;
	isVisible?: boolean;
}

const IconComponent: FC<IconProps> = ({
	name,
	size = "default",
	color = "var(--color-neutral)",
	className,
	isVisible = true,
}) => {
	return (
		<Icon
			icon={`mdi:${name}`}
			className={className}
			style={{
				fontSize: ESizes[size] + "px",
				opacity: isVisible ? 1 : 0,
				color,
			}}
		/>
	);
};

export default IconComponent;
