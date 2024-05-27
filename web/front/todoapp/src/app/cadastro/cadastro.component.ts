import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ HttpClientModule ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private http: HttpClient) {}
  readonly APIUrl="http://localhost:5038/api/todoapp/";

  processarCadastro() {
    console.log("chegou aqui")
    var nome = (<HTMLInputElement>document.getElementById("nome")).value;
    var senha = (<HTMLInputElement>document.getElementById("senha")).value;
    var formData=new FormData();
    formData.append("username", nome);
    formData.append("password", senha);

    this.http.post(this.APIUrl+'cadastro', formData).subscribe(data=> {
      alert(data);
    });
  }

}
