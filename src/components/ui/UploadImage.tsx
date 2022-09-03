import { FC, useState } from "react";
import Icon from "./Icon";

export interface UploadImageProps {
	value?: string;
	onChange?: (url: string) => void;
	className?: string;
}

const UploadImage: FC<UploadImageProps> = ({ className, value, onChange }) => {
	const [isHover, setIsHover] = useState(false);

	const onImageChange = (event: any) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			const FR = new FileReader();

			FR.addEventListener("load", function (evt) {
				evt?.target && onChange && onChange("" + evt.target.result);
			});

			FR.readAsDataURL(img);
		}
	};

	return (
		<label
			htmlFor="upload-image"
			title="Upload image"
			className={[
				"h-16 w-16 relative flex items-center justify-start cursor-pointer",
				className
			].join(" ")}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div
				style={{ borderStyle: value ? "solid" : "dashed" }}
				className="w-full h-full relative overflow-hidden rounded-[50%] border border-neutral flex items-center justify-center"
			>
				{value ? (
					<div
						className="w-full h-full bg-cover bg-center"
						style={{ backgroundImage: `url(${value})` }}
					></div>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="text-neutral"
						width="34"
						viewBox="0 0 139 186"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M102 56C102 74.2254 87.2254 89 69 89C50.7746 89 36 74.2254 36 56C36 37.7746 50.7746 23 69 23C87.2254 23 102 37.7746 102 56ZM107 56C107 76.9868 89.9868 94 69 94C48.0132 94 31 76.9868 31 56C31 35.0132 48.0132 18 69 18C89.9868 18 107 35.0132 107 56ZM112.415 113.964C97.6197 107.504 83.8888 104.411 70.0494 104.502C56.2198 104.592 42.4215 107.861 27.4899 113.939C25.8265 114.616 24.2413 115.097 22.6588 115.552C22.4376 115.616 22.2147 115.679 21.9905 115.743L21.9883 115.744C20.6468 116.126 19.2598 116.522 17.9363 117.012C14.6906 118.213 11.673 120.032 8.97918 123.914C6.43866 127.574 5.11388 131.098 4.672 134.836C4.23691 138.517 4.67533 142.274 5.45439 146.347C6.61358 152.409 8.77508 157.143 12.1867 160.731C15.5954 164.316 20.0528 166.546 25.4278 167.955C35.2316 170.525 48.8239 170.513 66.2821 170.499L66.3716 170.499C67.6826 170.498 69.0155 170.496 70.3701 170.496H70.5003C87.9162 170.496 102.126 170.496 112.497 167.619C117.773 166.155 122.241 163.904 125.694 160.394C129.162 156.87 131.431 152.254 132.605 146.367C134.348 137.627 133.801 130.534 128.635 123.12C126.052 119.412 123.396 117.721 120.518 116.64C119.424 116.229 118.279 115.901 117.197 115.59L117.191 115.589C116.95 115.52 116.713 115.452 116.48 115.384C115.153 114.997 113.829 114.581 112.415 113.964ZM29.3751 118.57C43.8869 112.663 57.0475 109.587 70.0821 109.502C83.1069 109.417 96.1456 112.316 110.415 118.546C112.123 119.292 113.689 119.779 115.082 120.184C115.365 120.267 115.636 120.345 115.898 120.42L115.898 120.42C116.965 120.726 117.871 120.987 118.759 121.32C120.769 122.075 122.575 123.168 124.533 125.978C128.697 131.955 129.266 137.545 127.702 145.389C126.676 150.532 124.778 154.196 122.13 156.887C119.469 159.592 115.875 161.492 111.16 162.801C101.577 165.46 88.1402 165.496 70.3701 165.496C69.1481 165.496 67.9479 165.497 66.7691 165.498L66.6865 165.498H66.6864C48.7865 165.508 35.8422 165.516 26.6957 163.118C21.9115 161.864 18.3893 159.998 15.81 157.285C13.2337 154.576 11.3989 150.813 10.3654 145.408C9.61845 141.502 9.29246 138.341 9.63743 135.423C9.97562 132.562 10.9754 129.807 13.0868 126.765C15.084 123.887 17.1825 122.623 19.6721 121.701C20.8009 121.283 21.9794 120.946 23.3306 120.56C23.5621 120.494 23.7986 120.427 24.0409 120.357C25.6597 119.892 27.4549 119.352 29.3751 118.57Z"
							fill="currentColor"
						/>
					</svg>
				)}
				<div
					style={{ opacity: isHover ? 1 : 0 }}
					className="transition-all flex items-center justify-center bg-black/40 absolute w-full h-full"
				>
					<Icon className="!opacity-60" size="md" name="upload" />
				</div>
			</div>
			<Icon
				className="absolute bottom-[-2px] right-[-3px]"
				name="pencil"
				size="sm"
			/>
			<input
				id="upload-image"
				className="hidden"
				type="file"
				onChange={onImageChange}
			/>
		</label>
	);
};

export default UploadImage;
