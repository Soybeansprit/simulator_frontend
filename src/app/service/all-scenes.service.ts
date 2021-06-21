import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllScenesService {


  
  constructor(public http:HttpClient) { }


}
