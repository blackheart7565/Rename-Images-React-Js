import { useEffect, useState } from "react";
import { TDispatch } from "../types/common";

type TLocalStorageReturn<T> = [T, TDispatch<T>];

export const useLocalStorage = <T,>(key: string, defData: T): TLocalStorageReturn<T> => {
	const [storage, setStorage] = useState<T>(() => {
		const localData = localStorage.getItem(key);
		return localData ? JSON.parse(localData) : defData;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(storage));
	}, [key, storage]);

	return [storage, setStorage];
};
