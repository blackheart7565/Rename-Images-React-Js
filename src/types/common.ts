import { Dispatch, SetStateAction } from "react";

export type TDispatchImages<T> = Dispatch<SetStateAction<T>>;

export type TStringNumber = string | number;