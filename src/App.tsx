import Header from "./components/Header";
import ClientsTable from "./components/ClientsTable";
import { User } from "./types/User";

const exampleUsers: Array<User> = [
	{
		name: "Alina",
		dateOfBirth: "16.04.1958",
		email: "alina@email.com",
		status: "Active",
	},
	{
		name: "Benedict",
		dateOfBirth: "23.05.1968",
		email: "benedict@email.com",
		status: "Pending",
	},
	{
		name: "Charlotte",
		dateOfBirth: "03.11.1998",
		email: "charlotte@email.com",
		status: "Blocked",
	},
];

function App() {
	return (
		<>
			<Header />
			<ClientsTable users={exampleUsers} />
		</>
	);
}

export default App;
