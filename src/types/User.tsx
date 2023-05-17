export interface User {
	name: string;
	dateOfBirth: string;
	email: string;
	status: "Active" | "Pending" | "Blocked";
}
