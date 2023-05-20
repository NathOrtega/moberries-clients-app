export interface Client {
	id: string;
	name: string;
	dateOfBirth: string;
	email: string;
	status: "Active" | "Pending" | "Blocked";
}

export type Clients = Client[]

export type clientWithoutId = Omit<Client, 'id'>
