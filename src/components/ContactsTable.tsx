import { FC, useEffect } from "react";
import { IContact } from "@/types/types";
import Table from "./ui/Table";
import { deleteContact, getContacts } from "@/store/reducers/contactsReducer";
import { useAppDispatch, useAppSelector } from "@/store";

interface ITableProps {
	search: string;
}

export const ContactsTable: FC<ITableProps> = ({ search }) => {
	const dispatch = useAppDispatch();
	const { contacts } = useAppSelector((state) => state.contacts);
	const headers = [
		{
			name: "name",
			width: 2,
			isSortable: true
		},
		{
			name: "email",
			width: 3,
			isSortable: true
		},
		{
			name: "phone",
			width: 3,
			isSortable: true
		}
	];

	useEffect(() => {
		dispatch(getContacts());
	}, []);

	const onEdit = (contact: IContact) => {
		console.log("edit ", contact);
	};

	const onDelete = (contact: IContact) => {
		dispatch(deleteContact(contact.id));
	};

	return (
		<Table
			headers={headers}
			data={contacts}
			search={search}
			searchField="name"
			width="800px"
			contentHeight="70vh"
			onEdit={onEdit}
			onDelete={onDelete}
		/>
	);
};

export default ContactsTable;
