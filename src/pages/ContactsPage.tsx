import Search from "@/components/ui/Search";
import Table from "@/components/ui/Table";
import { FC, useState } from "react";

export const ContactsPage: FC = () => {
	const [search, setSearch] = useState("");
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
	const tableData = [
		{
			id: "69385ad9-e45c-4ad3-b0cb-7c99f819c81d",
			name: "Corri Robic",
			email: "crobic0@bravesites.com",
			phone: "+52 (131) 522-1655"
		},
		{
			id: "4bb8b9be-53b9-4c7c-b446-1cfedba74b28",
			name: "Belita Waberer",
			email: "bwaberer1@nps.gov",
			phone: "+62 (813) 235-8065"
		},
		{
			id: "b068ce12-fee2-412c-ae28-e40c9b0172dd",
			name: "Eal Marchiso",
			email: "emarchiso2@biglobe.ne.jp",
			phone: "+506 (227) 305-0011"
		},
		{
			id: "d721c259-f0f9-4474-847a-0d5c6f4765bf",
			name: "Nikki Betteriss",
			email: "nbetteriss3@vk.com",
			phone: "+20 (812) 919-8066"
		},
		{
			id: "5be825d9-7a3b-4647-808a-bde45341a220",
			name: "Andrew Mantrip",
			email: "amantrip4@bloglovin.com",
			phone: "+55 (432) 529-5466"
		}
	];

	return (
		<div className="p-4 flex justify-center">
			<div className="overflow-hidden">
				<div className="flex gap-2 items-center justify-between mb-4">
					<Search value={search} setValue={setSearch} />
					<button
						type="button"
						className="whitespace-nowrap text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						New contact
					</button>
				</div>
				<Table headers={headers} tableData={tableData} />
			</div>
		</div>
	);
};

export default ContactsPage;
