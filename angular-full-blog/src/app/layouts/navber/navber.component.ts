import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-navber',
  templateUrl: './navber.component.html',
  styleUrls: ['./navber.component.css']
})
export class NavberComponent implements OnInit {

  categoryList!: any;

  constructor(private cS: CategoryService) { }
  ngOnInit(): void {
    this.cS.onload().subscribe(cat => {
      this.categoryList = cat;
    })
  }

}


