import { Injectable } from '@angular/core';
import { SceneService } from './scene.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceAnalysisService {

  constructor(public sceneService:SceneService) { }


}
