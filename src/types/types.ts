export type sort = "asc" | "desc" | null;

export interface IUser {
	id: number | null;
	email: string;
}

export interface IContact {
	id?: number | null;
	name: string;
	email: string;
	phone: string;
	imageSrc?: string;
}
