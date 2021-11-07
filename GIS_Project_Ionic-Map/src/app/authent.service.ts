import { Session } from './map/map.component';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class AuthentService {
        admin:any;
        password:any;
        connected : boolean=false;
        private apiBaseUrl = "http://localhost:8081"; 

      constructor(private http:HttpClient) {
      }  
      public Adduser(firstName:any,lastName:any,email:any,password:any):Observable<any>{
          return this.http.post<any>(this.apiBaseUrl+'/add',
          {firstName:firstName,lastName:lastName,email:email,password:password})
      }
      public getuser(firstName:any,password:any):boolean{
        this.http.get<any>(this.apiBaseUrl+'/getUserByEmail/'+firstName).subscribe(
          Response=>{
            this.admin=Response;
            this.password=this.admin["password"];
            if(this.password==password)
            {
              sessionStorage.setItem('id',this.admin["id"]);
              sessionStorage.setItem('firstName',this.admin["firstName"]);
              sessionStorage.setItem('lastName',this.admin["lastName"]);
              this.connected=true;              

           }
           
           
          },error=>{console.log(alert('user not found'))}
          
        );
        return this.connected;
      }


    }
    