import { Component, OnInit } from '@angular/core';
import { LemoncoderService } from './lemoncoder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: string;
  constructor(private lemoncoderService: LemoncoderService) {}

  ngOnInit(): void {
  //  this.login = this.lemoncoderService.getCoder('').login;
    this.lemoncoderService.getCoder('JaimeSalas')
      .subscribe((login) => this.login = login);
  }
}
