import { IContact } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
	isShowEditModal: boolean;
	editModalData: IContact | null;
}

const initialState: IState = {
	isShowEditModal: false,
	editModalData: null
};

export const modalsSlice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		showEditModal(state, action: PayloadAction<IContact>) {
			state.isShowEditModal = true;
			state.editModalData = action.payload;
		},
		hideEditModal(state) {
			state.isShowEditModal = false;
			state.editModalData = null;
		}
	}
});

export const { showEditModal, hideEditModal } = modalsSlice.actions;
export default modalsSlice.reducer;
