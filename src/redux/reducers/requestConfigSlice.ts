import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { APIT } from "../../types/api";
import type { CommonT } from "../../types/common";

const initialState: APIT.RequestConfigI = {
	requestUrl: "",
	requestMethod: "GET",
	requestParams: {}
};

export const requestConfigSlice = createSlice({
	name: "requestConfigSlice",
	initialState,
	reducers: {
		clearConfig(state) {
			// eslint-disable-next-line no-unused-vars
			state = initialState;
		},

		updateConfig(state, action: PayloadAction<CommonT.MainRequestMethods | string>) {
			state.requestMethod = action.payload;
		}
	}
});

export default requestConfigSlice;
