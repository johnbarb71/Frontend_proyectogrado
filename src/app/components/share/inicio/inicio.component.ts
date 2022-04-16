import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class ShareInicioComponent implements OnInit {

  constructor(private auth:AuthService) {
    
   }

  ngOnInit(): void {
    
  }

  

}
