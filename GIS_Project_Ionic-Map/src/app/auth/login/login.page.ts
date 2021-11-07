import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import {AuthentService} from 'src/app/authent.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router,private authentService:AuthentService) { }
  form!: NgForm;
  firstName: string="";
  password:string="";
  ngOnInit() {
  }
  
  onSubmit(form:NgForm){
    this.firstName=form.value['firstName'];
    this.password=form.value['password'];
    console.log(this.firstName);
      return this.authentService.getuser(this.firstName,this.password);
  }
  
}
