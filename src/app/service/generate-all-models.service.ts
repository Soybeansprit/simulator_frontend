import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GenerateAllModelsService {

  httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
  constructor(public http:HttpClient) { }








 


}
