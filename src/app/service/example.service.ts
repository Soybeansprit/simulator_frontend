import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http:HttpClient) { }


 

  getStudent(): Observable<any>{
		console.log('getStudent')
		const url = `http://localhost:8083/file/getStudents`;
		var students = this.http.get<any>(url);
		return students;
	}

}
