import { FC, useEffect, useState } from "react";
import Search from "@/components/ui/Search";
import Table from "@/components/ui/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteContact, getContacts } from "@/store/reducers/contactsReducer";
import { showEditModal } from "@/store/reducers/modalsReducer";
import { IContact } from "@/types/types";

export const ContactsPage: FC = () => {
	const dispatch = useAppDispatch();
	const [search, setSearch] = useState("");
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

	const onCreateContact = () => {
		dispatch(showEditModal({ email: "", name: "", phone: "" }));
	};

	const onEditContact = (contact: IContact) => {
		console.log("edit ", contact);
	};

	const onDeleteContact = (contact: IContact) => {
		dispatch(deleteContact(contact.id));
	};

	return (
		<div className="p-4 flex justify-center">
			<div className="overflow-hidden">
				<div className="flex gap-2 items-center justify-between mb-4">
					<Search value={search} setValue={setSearch} />
					<button
						onClick={onCreateContact}
						type="button"
						className="btn-primary"
					>
						New contact
					</button>
				</div>
				<Table
					headers={headers}
					data={contacts}
					search={search}
					searchField="name"
					width="800px"
					contentHeight="70vh"
					onEdit={onEditContact}
					onDelete={onDeleteContact}
				/>
			</div>
		</div>
	);
};

export default ContactsPage;
