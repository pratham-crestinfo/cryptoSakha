import { Firestore } from "@angular/fire/firestore";
import { createReducer } from "@ngrx/store";
import { DataBaseServie } from "../shared/database.service";



const initialState:string[]=[];
// const firestore=new Firestore();
// const dbs= new DataBaseServie(Firestore).
export const coinReducer = createReducer(initialState)