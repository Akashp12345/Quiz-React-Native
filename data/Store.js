import { configureStore } from "@reduxjs/toolkit";
import dataslice from "./Reducer"
const Store=configureStore({
    reducer:{
        data:dataslice
    }
})
export default Store