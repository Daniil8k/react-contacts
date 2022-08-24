import ContactsTable from "@/components/ContactsTable";
import Search from "@/components/ui/Search";
import { FC, useState } from "react";

export const ContactsPage: FC = () => {
	const [search, setSearch] = useState("");

	return (
		<div className="p-4 flex justify-center">
			<div className="overflow-hidden">
				<div className="flex gap-2 items-center justify-between mb-4">
					<Search value={search} setValue={setSearch} />
					<button type="button" className="btn-primary">
						New contact
					</button>
				</div>
				<ContactsTable search={search} />
			</div>
		</div>
	);
};

export default ContactsPage;
