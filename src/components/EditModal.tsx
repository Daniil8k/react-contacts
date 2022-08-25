import { useAppDispatch, useAppSelector } from "@/store";
import { createContact, updateContact } from "@/store/reducers/contactsReducer";
import { hideEditModal } from "@/store/reducers/modalsReducer";
import { IContact } from "@/types/types";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/input";
import Modal from "./ui/Modal";

export const EditModal: FC = ({}) => {
	const dispatch = useAppDispatch();
	const { isShowEditModal, editModalData } = useAppSelector(
		(state) => state.modals
	);
	const { register, handleSubmit, control, setValue } = useForm<IContact>();
	const isNewContact = useMemo(() => !editModalData?.id, [editModalData?.id]);

	const setOpen = () => {
		dispatch(hideEditModal());
	};

	useEffect(() => {
		if (editModalData) {
			setValue("id", editModalData.id);
			setValue("email", editModalData.email);
			setValue("name", editModalData.name);
			setValue("phone", editModalData.phone);
		}
	}, [editModalData]);

	const onSubmit = (contact: IContact) => {
		dispatch(isNewContact ? createContact(contact) : updateContact(contact));
	};

	return (
		<Modal
			title={isNewContact ? "New contact" : "Edit contact"}
			open={isShowEditModal}
			setOpen={setOpen}
			onSave={handleSubmit(onSubmit)}
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
						{...register("email")}
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
