import {createSlice} from '@reduxjs/toolkit'
// import  {PayloadAction} from '@reduxjs/toolkit'



const initialState = {
mode: "light",
sidebar: false,
searchbar: false,
activeTab: {value: "Home"},
searchTerm: "",

}

export const appSlice = createSlice ({
    name: 'app',
    initialState,
    reducers:{
            
        setActiveTab: ((state, PayloadAction) => {

                state.activeTab = { value: PayloadAction.payload};
                console.log(PayloadAction.payload)

        }),

        toDark: (state => {
                
                console.log("REDUCER DARK MODE STATE ON")
                state.mode = "dark";
                console.log(state.mode)
                document.documentElement.classList.remove('light'); // remove 'light' from html class
                document.documentElement.classList.add('dark'); 
                localStorage.theme = 'dark' // add 'dark' to html class
        }),

        toLight: (state => {

                console.log("REDUCER LIGHT MODE STATE ON")
                state.mode = "light";
                document.documentElement.classList.remove('dark'); // remove 'dark' from html class
                document.documentElement.classList.add('light'); //add 'light' to html class
                localStorage.theme = 'light' // add 'dark' to html class
        }),

        sidebarToggle: (state => {
            state.sidebar = !state.sidebar
            console.log("sidebar is", state.sidebar)
        }),
        searchbarToggle: (state => {
                state.searchbar = !state.searchbar
                console.log("sidebar is", state.searchbar)
            }),

        setSearchTerm: ((state, PayloadAction) => {

                state.searchTerm = {...state, value: PayloadAction.payload};
                console.log(PayloadAction.payload)

        }),

    }
})

export const {
toDark , toLight, sidebarToggle, setActiveTab, searchbarToggle, setSearchTerm
} = appSlice.actions

export default appSlice.reducer