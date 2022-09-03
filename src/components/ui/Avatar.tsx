import { FC } from "react";

interface IAvatarProps {
	src: string;
}

export const Avatar: FC<IAvatarProps> = ({ src = "" }) => {
	const defaultImg =
		"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

	const imageOnErrorHandler = (
		event: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		event.currentTarget.onerror = null;
		event.currentTarget.src = defaultImg;
	};

	return (
		<img
			className="min-w-[2rem] min-h-[2rem] w-8 h-8 bg-card rounded-[50%]"
			src={src ? src : defaultImg}
			onError={imageOnErrorHandler}
		/>
	);
};

export default Avatar;
