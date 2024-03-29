import { useEffect, useState } from "react";

export const useSetTheme = () => {
	const [isDark, setIsDark] = useState<boolean>(false);

	useEffect(() => {
		if (isDark) {
			document.body.setAttribute("data-theme", "dark");
		} else {
			document.body.setAttribute("data-theme", "light");
		}
	}, [isDark]);

	return {
		isDark,
		setIsDark
	};
};