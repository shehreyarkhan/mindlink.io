import {createSlice} from '@reduxjs/toolkit'
import  {PayloadAction} from '@reduxjs/toolkit'



const initialState = {
user: {
    name: 'Creator',  
},
categories: [],
marketplace: [],
artworks:[],
generatedArt: "test.png"
}

export const dataSlice = createSlice ({
    name: 'data',
    initialState,
    reducers:{
        // toggle: (state, action: PayloadAction<string>) => {
        //     state.mode = "light"
        // }
        setActiveUser: ((state, PayloadAction) => {

            state.user = {value: PayloadAction.payload};
            console.log(state.user)

    }),
     
    }
})

export const {setActiveUser} = dataSlice.actions

export default dataSlice.reducer