import { createSlice } from "@reduxjs/toolkit";

import { DataInterface } from '~/utilities/types'

const initialState: DataInterface = {

    user: {

        id: null,

        photo: "",

        username: "",

        contact: "",

        is_logged_in: false,

    }

}

export const dataSlice = createSlice({

    initialState,

    name: "data-slice",

    reducers: {

        loginUser: (state, action) => {

            console.log(action.payload)

            state.user.username = action?.payload?.user?.username

            state.user.id = action?.payload?.user?.user_id

            state.user.contact = action?.payload?.user?.contact

            state.user.photo = action?.payload?.user?.photo

            state.user.is_logged_in = true
        },

        logout: (state) => {

            state.user = {}

        },

        setUser: (state, action) => {

            if (action?.payload?.photo) {

                state.user.photo = action.payload?.photo

                return
            }

            if (action?.payload?.username) {

                state.user.username = action.payload?.username

                return
            }


        }

    },

    extraReducers: (builder) => { }

})

export default dataSlice.reducer

export const { setUser, loginUser, logout } = dataSlice.actions

export const getData = (state: any) => state?.data