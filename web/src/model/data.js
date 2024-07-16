import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"))

const savedOrganization = JSON.parse(localStorage.getItem("organization"))

const initialState = {

    refresh: false,

    // user details 
    user: {
        photo: savedUser?.photo,
        username: savedUser?.username,
        user_id: savedUser?.user_id,
        isLoggedIn: savedUser?.isLoggedIn,
        email: savedUser?.email,
        role: savedUser?.role,
        tokens: {
            access: savedUser?.access,
            refresh: savedUser?.refresh
        }
    },

    DashboardLock: false,

    // alert message 
    msg: {},

    //organization
    organization: {
        id: savedOrganization?.id,
        name: savedOrganization?.name,
        address: savedOrganization?.address,
        contact: savedOrganization?.contact,
        licence: savedOrganization?.licence,
        is_active: savedOrganization?.is_active,
    }

}

export const loginUser = createAsyncThunk("data/loginUser", async () => {



})

export const dataSlice = createSlice({
    name: "data-slice",
    initialState,
    reducers: {

        // set alert message 
        sendAlertMessage: (state, action) => {
            state.msg = action.payload
        },
        // end set alert message 

        // clear alert message
        clearAlertMessage: (state) => {
            state.msg = {}
        }
        // end clear alert message

        , refreshApp: (state) => {
            state.refresh = !state.refresh
        }


        , setUser: (state, action) => {
            state.user = action.payload
        },
        setOrganization: (state, action) => {
            state.organization = action.payload
        },


        clearUser: (state) => {
            state.user = {}
            localStorage.removeItem("user")
            localStorage.removeItem("organization")
        },

        lockScreen: (state) => {

            state.DashboardLock = true

        },
        unLockScreen: (state) => {

            state.DashboardLock = false

        }

    },
    extraReducers: () => {
    }
})

// get user info 
export const getUser = (state) => state.data.user

export const getOrganization = (state) => state.data.organization

//get alert message
export const getAlertMessage = (state) => state.data.msg

//get lock status
export const DashboardLock = (state) => state.data.DashboardLock

export const refreshStatus = (state) => state.data?.refresh

// export reducers 
export const { sendAlertMessage, unLockScreen, refreshApp, clearUser, clearAlertMessage, setUser, setOrganization, lockScreen } = dataSlice.actions



export default dataSlice.reducer