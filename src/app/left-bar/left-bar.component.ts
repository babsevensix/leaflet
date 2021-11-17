import { Component, OnInit } from '@angular/core';
import { PuntiMappaService } from '../services/punti-mappa.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss']
})
export class LeftBarComponent implements OnInit {



  constructor(public puntiMappaService: PuntiMappaService) {
    this.puntiMappaService.getPuntiMappa$().subscribe(res=>{
      console.log(res);
    })
  }

  ngOnInit(): void {

  }

}
