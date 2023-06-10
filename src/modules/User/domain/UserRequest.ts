export interface UserRequest {
	id: string;
	name: string;
	email: string;
	password: string;
	isActive: boolean | null;
}
