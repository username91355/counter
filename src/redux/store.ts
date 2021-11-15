import {combineReducers, createStore} from "redux";
import { counterReducer } from "./counter-reducer";

const rootReducer = combineReducers({
    counter: counterReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer)

//type StoreType = typeof store