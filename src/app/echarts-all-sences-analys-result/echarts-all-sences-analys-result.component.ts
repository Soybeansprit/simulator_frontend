import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
@Component({
  selector: 'app-echarts-all-sences-analys-result',
  templateUrl: './echarts-all-sences-analys-result.component.html',
  styleUrls: ['./echarts-all-sences-analys-result.component.css']
})
export class EchartsAllSencesAnalysResultComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
   
    var scroll_FLAG = true

			function scroll_move(div: { getAttribute: (arg0: string) => any; offsetHeight: any; scrollTop: any; scrollHeight: number; }) {
				 div.scrollTop = div.getAttribute("scrollTop");
				if (div.offsetHeight + div.scrollTop >= div.scrollHeight) {
					scroll_FLAG = true;
					document.getElementById("info")!.style.visibility = "hidden"
					return
				}else{
					scroll_FLAG = false;
					document.getElementById("info")!.style.visibility = "visible"
				}
            }
            
			
			function add_msg(){
				var div = document.getElementById("the_div");
				div!.innerText += "123\n"
				if(scroll_FLAG){
					div!.scrollTo(0,div!.scrollHeight)
				}
			}
			
			setInterval(add_msg,1000)
  }

  

}
