import { useCallback, useEffect, useRef } from "react";

export function useClickOutside<T extends Element>(callback: () => void) {
	const ref = useRef<T | null>(null);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			callback();
		}
	}, [callback]);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, [handleClickOutside]);

	return {
		ref
	};
};