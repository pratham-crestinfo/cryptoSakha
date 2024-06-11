import { Injectable } from "@angular/core";
import { Firestore, doc, updateDoc, arrayUnion,DocumentSnapshot,getDoc  } from '@angular/fire/firestore';
import { coinDataService } from "./coindata.service";
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataBaseServie{
     CoinIdArray=new BehaviorSubject<string[]>([]);
     
     constructor(private firestore: Firestore) {}
     addCoinId(uid:string,coinid:string){
          const docRef = doc(this.firestore, "cryto_sakha", "coin_id");
          updateDoc(docRef, {[uid]: arrayUnion(coinid)});
          this.getcoind(uid).then((data)=>{
               console.log(data);
               this.CoinIdArray.next(data);
          })
     }
     async getcoind(uid:string){
          const docRef = doc(this.firestore, "cryto_sakha", "coin_id");
          const docSnap: DocumentSnapshot<any> = await getDoc(docRef);
          if (docSnap.exists()) {
               // console.log(docSnap.get(uid))
               return docSnap.get(uid)
             } else {
               return null; 
             }
     }
     makeIdArray(uid:string){
          this.getcoind(uid).then((data)=>{
               console.log("data:",data);
               this.CoinIdArray.next(data);
               console.log(this.CoinIdArray);
          })
     }
   
}