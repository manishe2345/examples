import { Component,OnInit} from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


   Cards!:any;
   latestCards!:any;

  constructor(private pS:PostService){}

  ngOnInit(): void {
    this.pS.loaddata().subscribe(cad => {
      this.Cards=cad;
      console.log(this.Cards)
    });

    this.pS.loadLatest().subscribe(val =>{
      this.latestCards=val;
    })


  }


}
