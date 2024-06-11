import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataBaseServie } from '../shared/database.service';
import { Auth, getAuth, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

@ViewChild("auth") authForm:NgForm;
error:boolean=false;
msg:string="";
user:User=null;
info:boolean=false;
  constructor(private authservice:AuthService,private router: Router,private activeRoute:ActivatedRoute,private dbs:DataBaseServie){}
  onSignUp(myform:NgForm)
  {
    console.log("signup...");
    this.authservice.signUp(myform.form.value.email,myform.form.value.password).subscribe({
      next:(res)=>{
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
        this.user = new User(res.email,res.localId,res.idToken,expirationDate);
        this.authservice.user.next(this.user);
       
        this.authservice.isAuthenticated.next(true);
      },
      error:(err:any)=>
      {
        this.error=true;
        this.msg="*An Error Occurred: " + err.error.error.message;
        console.log(err);

      },
      complete:()=>{
      localStorage.setItem("userData",JSON.stringify(this.user))
        // this.router.navigate(['/home'],{relativeTo:this.activeRoute})
      }
    })
  }
  onSignIn(form:NgForm)
  {
    console.log("SIGNin...");
    this.authservice.SignIn(form.form.value.email,form.form.value.password).subscribe({
      next:(res)=>{
        console.log(res);
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
        this.user = new User(res.email,res.localId,res.idToken,expirationDate);
        this.authservice.user.next(this.user);
        console.log(this.authservice.user)
        this.authservice.isAuthenticated.next(true);
      },
      error:(err:any)=>
      {
        this.error=true;
        this.msg="*An Error Occurred: " + err.error.error.message;
        console.log(err);
      },
      complete:()=>{
        this.dbs.makeIdArray(this.user.id);
        localStorage.setItem("userData",JSON.stringify(this.user))
        // this.router.navigate(['/home'],{relativeTo:this.activeRoute})
      }
    })
  }



// FORGOT PASSWORD:
passreset(myform:NgForm){
 console.log("clicked!");
 const auth = getAuth();
sendPasswordResetEmail(auth, myform.form.value.email)
  .then(() => {
    // Password reset email sent!
    this.info=true;
    this.msg="Please check your mail-box to reset pass-word...! "
    myform.controls['password'].reset()

    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    this.msg = error.message;
    this.error=true;

  });

}


}
