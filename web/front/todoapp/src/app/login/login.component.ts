import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient) {}
  readonly APIUrl="http://localhost:5038/api/todoapp/";

  options = {
    withCredentials: true // Aqui está a opção que você deseja configurar
  };

  login() {
    console.log("login")
    var nome = (<HTMLInputElement>document.getElementById("nome")).value;
    var senha = (<HTMLInputElement>document.getElementById("senha")).value;
    var formData=new FormData();
    formData.append("username", nome);
    formData.append("password", senha);

    this.http.post(this.APIUrl+'login', formData, this.options).subscribe(data=> {
      alert(data);
    });
  }
}
