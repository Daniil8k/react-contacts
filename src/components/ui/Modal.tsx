import {
	Dispatch,
	FC,
	Fragment,
	ReactNode,
	SetStateAction,
	useRef
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "./Button";

interface IModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
	title?: string;
	saveLabel?: string;
	onSave?: () => void;
	onCancel?: () => void;
}

export const Modal: FC<IModalProps> = ({
	open,
	setOpen,
	children,
	title,
	saveLabel = "Save",
	onSave = () => {},
	onCancel = () => {}
}) => {
	const cancelButtonRef = useRef(null);

	const onSaveClick = () => {
		setOpen(false);
		onSave();
	};

	const onCancelClick = () => {
		setOpen(false);
		onCancel();
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="w-[80vw] relative bg-card-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full">
								<div
									style={{ opacity: open ? 1 : 0 }}
									className="bg-card-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
								>
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:mt-0 sm:text-left">
											{title && (
												<Dialog.Title
													as="h3"
													className="mb-2 text-lg leading-6 font-medium"
												>
													{title}
												</Dialog.Title>
											)}
											{children}
										</div>
									</div>
								</div>
								<div className="bg-card">
									<div style={{ opacity: open ? 1 : 0 }} className="px-4 py-3 sm:px-6 flex flex-col gap-3 sm:flex-row-reverse">
										<Button type="button" color="success" onClick={onSaveClick}>
											{saveLabel}
										</Button>
										<Button
											ref={cancelButtonRef}
											type="button"
											onClick={onCancelClick}
											color="neutral"
										>
											Cancel
										</Button>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
