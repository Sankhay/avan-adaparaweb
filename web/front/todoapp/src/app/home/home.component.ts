import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,FormsModule ,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'todoapp';
  readonly APIUrl="http://localhost:5038/api/todoapp/";

  constructor(private http:HttpClient){
  }
  notes:any=[];

  refreshNotes(){
    var data = {

    }
    var options = {
      withCredentials: true // Aqui está a opção que você deseja configurar
    };

    this.http.post(this.APIUrl+"GetNotes", data, options).subscribe(data=> {
      this.notes = data
    })
  }
    

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes(){
    var options = {
      withCredentials: true // Aqui está a opção que você deseja configurar
    };

    var newNotes=(<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData=new FormData();
    formData.append("newNotes", newNotes);
    this.http.post(this.APIUrl+'AddNotes', formData, options).subscribe(data=> {
      alert(data);
      this.refreshNotes();
    });
  }

  deleteNotes(id:any){
    this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=> {
      alert(data);
      this.refreshNotes();
    });
  }
}

