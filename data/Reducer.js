import { createSlice } from "@reduxjs/toolkit";
const Qdata = {
    Category: [{ id: 0, type: "Any" }, { id: 9, type: "General Knownledge" }, { id: 10, type: "Books" }, { id: 11, type: "Film" }, { id: 12, type: "Music" }, { id: 15, type: "Video Games" }, { id: 17, type: "Nature" }, { id: 18, type: "Computer Science" }, { id: 19, type: "Mathematics" }, { id: 21, type: "Sports" }, { id: 22, type: "Geography" }, { id: 23, type: "History" }, { id: 24, type: "Politics" }, { id: 25, type: "Arts" }, { id: 27, type: "Animals" }],
    Difficulty: ["Any", 'easy', "medium", "hard"],
    NoQ: 0,
    qstndta: []
}
const dataslice = createSlice({
    name: "game",
    initialState: Qdata,
    reducers: {
        add(state, action) {
            state.qstndta = action.payload
        }
    }
})
export const { add } = dataslice.actions
export default dataslice.reducer