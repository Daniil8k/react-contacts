import { FC, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	forwardedRef?: ForwardedRef<HTMLInputElement>;
	className?: string;
	error?: string;
	label?: string;
}

export const Input: FC<IInputProps> = ({
	forwardedRef,
	id,
	className,
	error,
	label,
	...inputProps
}) => {
	return (
		<div className={["text-left", className].join(" ")}>
			{label && (
				<label htmlFor={id} className="flex justify-between label mb-2">
					<span>{label}</span>
					{error && <span className="text-danger">{error}</span>}
				</label>
			)}
			<input
				ref={forwardedRef}
				id={id}
				className="input-auth"
				{...inputProps}
			/>
		</div>
	);
};

export default forwardRef(
	(props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => (
		<Input forwardedRef={ref} {...props} />
	)
);
