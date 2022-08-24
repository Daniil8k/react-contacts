import baseAxios from "@/api/helpers/baseAxios";
import { IContact } from "@/types/types";

const getConfig = () => ({
	headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
});

const getAll = async () => {
	const response = await baseAxios.get<IContact[]>("/contacts", getConfig());

	return response.data;
};

const create = async (contact: IContact) => {
	const response = await baseAxios.post<IContact[]>(
		"/contacts",
		contact,
		getConfig()
	);

	return response.data;
};

const update = async (contact: IContact) => {
	const response = await baseAxios.put<IContact[]>(
		`/contacts/${contact.id}`,
		contact,
		getConfig()
	);

	return response.data;
};

const remove = async (contactId: IContact["id"]) => {
	const response = await baseAxios.delete<IContact[]>(
		`/contacts/${contactId}`,
		getConfig()
	);

	return response.data;
};

export default { getAll, create, update, remove };
