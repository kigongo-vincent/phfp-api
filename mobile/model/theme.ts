import { createSlice } from "@reduxjs/toolkit";

import { constants } from "~/utilities/constants";

const initialState = {

    theme_name: "dark",

    theme: constants?.mode?.dark

}

export const themeSlice = createSlice({

    initialState,

    name: "theme-slice",

    reducers: {

        toggle_mode: (state) => {

            if (state.theme_name == "light") {

                state.theme = constants?.mode?.dark

                state.theme_name = "dark"

                return

            }

            else {

                state.theme = constants?.mode?.light

                state.theme_name = "light"

                return

            }


        }

    },

    extraReducers: (builder) => { }

})

export default themeSlice.reducer

export const getTheme = (state: any) => state?.UI

export const { toggle_mode } = themeSlice.actions