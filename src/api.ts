import { Client, Clients, clientWithoutId } from "./types/Client"
import { v1 as UUID } from 'uuid';

const clients: Clients = [
  {
    id: UUID(),
    name: "Alina",
    dateOfBirth: "1958-04-16",
    email: "alina@email.com",
    status: "Active",
  },
  {
    id: UUID(),
    name: "Benedict",
    dateOfBirth: "1968-05-23",
    email: "benedict@email.com",
    status: "Pending",
  },
  {
    id: UUID(),
    name: "Charlotte",
    dateOfBirth: "1998-11-03",
    email: "charlotte@email.com",
    status: "Blocked",
  },
]

localStorage.setItem("clients", JSON.stringify(clients))

export const getClients = (): Client[] => {
  const clients = localStorage.getItem("clients")
  if (clients !== null) return JSON.parse(clients)
  else return []
}

export const addClient = (client: clientWithoutId) => {
  const newClient = {...client, id: UUID()}
  const clients = getClients()
  const updatedClients = clients.concat(newClient)
  localStorage.setItem("clients", JSON.stringify(updatedClients))
}

export const editClient = (updatedClient: Client) => {
  const clients = getClients()
  const updatedClients = clients.map((client) => {
    if (client.id === updatedClient.id) return updatedClient
    return client
  })
  localStorage.setItem("clients", JSON.stringify(updatedClients))
}

export const removeClient = (clientToRemove: Client) => {
  const clients = getClients()
  const updatedClients = clients.filter((client) => {
    if (client.id !== clientToRemove.id) return client
  })
  localStorage.setItem("clients", JSON.stringify(updatedClients))
}