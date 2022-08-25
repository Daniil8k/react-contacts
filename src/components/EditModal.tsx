import { useAppDispatch, useAppSelector } from "@/store";
import { hideEditModal } from "@/store/reducers/modalsReducer";
import { IContact } from "@/types/types";
import { FC, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import Modal from "./ui/Modal";

export const EditModal: FC = ({}) => {
	const dispatch = useAppDispatch();
	const { isShowEditModal, editModalData } = useAppSelector(
		(state) => state.modals
	);
	const { register, handleSubmit, control } = useForm<IContact>();
	const isNewContact = useMemo(() => !editModalData?.id, [editModalData?.id]);

	const setOpen = () => {
		dispatch(hideEditModal());
	};

	const onEdit = (contact: IContact) => {
		console.log(contact);
	};

	return (
		<Modal
			title={isNewContact ? "New contact" : "Edit contact"}
			open={isShowEditModal}
			setOpen={setOpen}
			onSave={handleSubmit(onEdit)}
			saveLabel={isNewContact ? "Create" : "Edit"}
		>
			<form className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				<div className="text-left">
					<label htmlFor="name" className="label mb-2">
						Name
					</label>
					<input
						id="name"
						type="text"
						className="input"
						placeholder="John Smith"
						defaultValue={editModalData.name}
						{...register("name")}
						required
					/>
				</div>
				<div className="text-left">
					<label htmlFor="email" className="label mb-2">
						Email
					</label>
					<input
						id="email"
						type="email"
						className="input"
						placeholder="name@company.com"
						defaultValue={editModalData.name}
						{...register("name")}
						required
					/>
				</div>
				<div className="text-left">
					<label htmlFor="phone" className="label mb-2">
						Phone
					</label>
					<Controller
						name="phone"
						control={control}
						defaultValue={editModalData.phone}
						render={({ field: { onChange, value } }) => (
							<PhoneInput
								className="input"
								value={value}
								onChange={onChange}
								placeholder="+1 000 000 0000"
								id="phone"
							/>
						)}
					/>
				</div>
			</form>
		</Modal>
	);
};

export default EditModal;
