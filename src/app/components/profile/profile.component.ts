import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //Function to redirec to linkedin page
  redirectToLinkedInPage(){
  	window.open("https://linkedin.com/in/NisargDave43","_blank");
  }
}
