import { Component, Input, OnInit } from '@angular/core';
import { SplashScreenService } from '../../services/splash-screen.service';

/**
 * Componente Splash Screen
 */
@Component({
  selector: 'app-splash-screen',
  templateUrl: 'splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent  {
  /**
   * Constructor
   * 
   * @param splashScreenService 
   */
  constructor(public splashScreenService: SplashScreenService) { }
}
