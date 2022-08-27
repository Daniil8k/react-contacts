import { RefObject, useEffect, useState } from "react";

export default function useFade(
	ref: RefObject<HTMLElement>
): [() => void, boolean] {
	const [isFade, setIsFade] = useState(false);

	const endFade = () => {
		setIsFade(false);
		ref.current?.classList.remove("fade");
	};

	const startFade = () => {
		setIsFade(true);
		ref.current?.classList.add("fade");
	};

	useEffect(() => {
		if (!ref.current) return;

		ref.current.onanimationend = endFade;
	}, []);

	return [startFade, isFade];
}
