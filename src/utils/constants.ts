export enum ESizes {
	"2xl" = 62,
	xl = 48,
	lg = 36,
	md = 24,
	default = 24,
	sm = 16
}

export type sizeType = keyof typeof ESizes;

export enum ErrorsAPI {
	noData = "Private resource access: entity must have a reference to the owner id",
	jwtExpired = "jwt expired"
}
