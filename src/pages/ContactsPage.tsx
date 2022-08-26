import { FC, useCallback, useEffect, useState } from "react";
import Search from "@/components/ui/Search";
import Table from "@/components/ui/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteContact, getContacts } from "@/store/reducers/contactsReducer";
import { showEditModal } from "@/store/reducers/modalsReducer";
import { IContact } from "@/types/types";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { logout } from "@/store/reducers/userReducer";

export const ContactsPage: FC = () => {
	const dispatch = useAppDispatch();
	const [search, setSearch] = useState("");
	const { contacts, error } = useAppSelector((state) => state.contacts);
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

	useEffect(() => {
		if (!error) return;

		toast.error(error);

		if (error === "jwt expired") {
			dispatch(logout());
		}
	}, [error]);

	const onCreateContact = useCallback(() => {
		dispatch(showEditModal({ email: "", name: "", phone: "" }));
	}, []);

	const onEditContact = (contact: IContact) => {
		dispatch(showEditModal(contact));
	};

	const onDeleteContact = (contact: IContact) => {
		dispatch(deleteContact(contact.id));
	};

	return (
		<div className="p-4 flex justify-center">
			<div className="overflow-hidden">
				<div className="flex gap-2 items-center justify-between mb-4">
					<Search value={search} setValue={setSearch} />
					<Button onClick={onCreateContact} type="button" size="md">
						New contact
					</Button>
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
