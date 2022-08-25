import {
	ButtonHTMLAttributes,
	FC,
	ForwardedRef,
	forwardRef,
	memo
} from "react";
import loadingSVG from "@/assets/loading.svg";

type size = "md";
type color = "primary" | "success" | "danger" | "neutral";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	forwardedRef?: ForwardedRef<HTMLButtonElement>;
	className?: string;
	children?: string;
	loading?: boolean;
	size?: size;
	color?: color;
}

export const Button: FC<IButtonProps> = ({
	forwardedRef,
	className = "",
	children = "",
	loading,
	color = "primary",
	size,
	...btnProps
}) => {
	return (
		<button
			ref={forwardedRef}
			className={[
				"btn",
				className,
				size === "md" ? "w-32" : "",
				color === "primary"
					? "bg-primary disabled:bg-primary-dark enabled:hover:bg-primary-dark border border-primary-light text-white"
					: "",
				color === "success"
					? "bg-success disabled:bg-success-dark enabled:hover:bg-success-dark border border-success-dark text-black"
					: "",
				color === "neutral"
					? "bg-neutral disabled:bg-neutral-dark enabled:hover:bg-neutral-dark border border-neutral-dark text-black"
					: "",
				color === "danger"
					? "bg-danger disabled:bg-danger-dark enabled:hover:bg-danger-dark border border-danger-dark text-black"
					: ""
			].join(" ")}
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

export default memo(
	forwardRef(
		(
			{ children, ...props }: IButtonProps,
			ref: ForwardedRef<HTMLButtonElement>
		) => (
			<Button {...props} forwardedRef={ref}>
				{children}
			</Button>
		)
	)
);
