import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from  "@angular/router";
import { AuthentService } from 'src/app/authent.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 // authService: any;

  constructor(private router:Router,private authentService:AuthentService) { }
  form!: NgForm;
  firstName: string="";
  lastName:String="";
  email:String="";
  password:string="";

  ngOnInit() {
  }
  
  onSubmit(form){
    console.log(this.firstName)
    
    this.authentService.Adduser(this.firstName,this.lastName,this.email,this.password).subscribe(
      response=>{

      },error=>{console.log}
    )
  }
}