import Search from "@/components/ui/Search";
import Table from "@/components/ui/Table";
import { useAppDispatch, useAppSelector } from "@/store";
import {
	createContact,
	deleteContact,
	getContacts,
	updateContact
} from "@/store/reducers/contactsReducer";
import { FC, useEffect, useState } from "react";

export const ContactsPage: FC = () => {
	const [search, setSearch] = useState("");
	const dispatch = useAppDispatch();
	const { contacts } = useAppSelector((state) => state.contacts);
	const headers = [
		{
			name: "name",
			isSortable: true
		},
		{
			name: "email",
			isSortable: true
		},
		{
			name: "phone",
			isSortable: true
		}
	];

	useEffect(() => {
		dispatch(getContacts());
	}, []);

	return (
		<div className="p-4 flex justify-center">
			<div className="overflow-hidden">
				<div className="flex gap-2 items-center justify-between mb-4">
					<Search value={search} setValue={setSearch} />
					<button
						type="button"
						className="btn-primary"
					>
						New contact
					</button>
				</div>
				<Table
					headers={headers}
					tableData={contacts}
					search={search}
					searchField="name"
				/>
			</div>
		</div>
	);
};

export default ContactsPage;
