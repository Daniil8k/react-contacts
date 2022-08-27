import { ButtonHTMLAttributes, FC } from "react";

interface ITextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children?: string;
}

export const TextButton: FC<ITextButtonProps> = ({
	className = "",
	children = "",
	...btnProps
}) => {
	return (
		<button
			className={[
				"select-none text-primary-dark enabled:hover:underline disabled:cursor-default disabled:text-neutral",
				className
			].join(" ")}
			{...btnProps}
		>
			{children}
		</button>
	);
};

export default TextButton;
