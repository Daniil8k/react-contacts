import { useAppDispatch, useAppSelector } from "@/store";
import { createContact, updateContact } from "@/store/reducers/contactsReducer";
import { hideEditModal } from "@/store/reducers/modalsReducer";
import { IContact } from "@/types/types";
import { FC, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import PhoneInput, {
	formatPhoneNumberIntl
} from "react-phone-number-input/input";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

export const EditModal: FC = ({}) => {
	const dispatch = useAppDispatch();
	const { isShowEditModal, editModalData } = useAppSelector(
		(state) => state.modals
	);
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors: formErrors }
	} = useForm<IContact>();
	const isNewContact = useMemo(() => !editModalData?.id, [editModalData]);

	const hideModal = () => {
		dispatch(hideEditModal());
	};

	useEffect(() => {
		if (editModalData) {
			reset({ ...editModalData });
		}
	}, [editModalData]);

	const onSubmit = (contact: IContact) => {
		contact.phone = formatPhoneNumberIntl(contact.phone)
			? formatPhoneNumberIntl(contact.phone)
			: contact.phone;
		dispatch(isNewContact ? createContact(contact) : updateContact(contact));
		hideModal();
	};

	return (
		<Modal open={isShowEditModal} setOpen={hideModal}>
			<form className="bg-card-dark" onSubmit={handleSubmit(onSubmit)}>
				<div className="p-4 pt-5 sm:p-6 sm:pb-4">
					<h3 className="mb-2 text-lg leading-6 font-medium">
						{isNewContact ? "New contact" : "Edit contact"}
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Input
							id="name"
							label="Name"
							placeholder="John Smith"
							error={formErrors.name?.message}
							{...register("name", { required: "Required" })}
						/>
						<Input
							id="email"
							label="Email"
							placeholder="name@company.com"
							{...register("email")}
						/>
						<div className="text-left">
							<label htmlFor="phone" className="label mb-2">
								Phone
							</label>
							<Controller
								name="phone"
								control={control}
								render={({ field: { onChange, value } }) => (
									<PhoneInput
										id="phone"
										className="input"
										value={value}
										onChange={onChange}
										placeholder="+1 000 000 0000"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="p-4 sm:px-6 sm:py-4 bg-card flex flex-col gap-3 sm:flex-row-reverse">
					<Button type="submit" color="success">
						{isNewContact ? "Create" : "Edit"}
					</Button>
					<Button type="button" onClick={hideModal} color="neutral">
						Cancel
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default EditModal;
