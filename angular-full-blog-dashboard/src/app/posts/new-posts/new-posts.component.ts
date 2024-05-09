import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

//interfaces 
interface CategoryItem {
  id: any;
  data: { Catgor: string };
};
//interfaces




@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css']
})


export class NewPostsComponent implements OnInit {

  postForm!: FormGroup
  ddata!: string;
  fdata!: any;
  saveStatus: string = 'save';



  constructor(private cS: CategoryService, private fb: FormBuilder, private pS: PostService, private route: ActivatedRoute, private rat: Router) {

    //this is to get id from queryparams and reflect the data in the specific input
  
    this.route.queryParams.subscribe(val => {
      this.ddata = val['id'];
      if (this.ddata){
      this.pS.editData(this.ddata).subscribe(net => {
        this.fdata = net;
        this.postForm = this.fb.group({
          title: [this.fdata.title, [Validators.required, Validators.minLength(10)]],
          plink: [this.fdata.plink, [Validators.required]],
          excerpt: [this.fdata.excerpt, [Validators.required, Validators.minLength(50)]],
          catry: [`${this.fdata.category.categoryid}-${this.fdata.category.category}`, [Validators.required]],
          imgsrc: ['', Validators.required],
          content: [this.fdata.content, Validators.required],
        });
        this.imgSrc = this.fdata.postimgpath
        this.saveStatus = 'edit';
        console.log(this.fdata)
      });
    } else {
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        plink: ['', [Validators.required]],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        catry: ['', [Validators.required]],
        imgsrc: ['', Validators.required],
        content: ['', Validators.required],
      });
    }
    })

    // these are validators for saving data form


  };


  categories: CategoryItem[] = [];


  ngOnInit(): void {
    this.cS.loadData().subscribe(val => {
      this.categories = val;
      console.log(this.categories)
    });
  }

  permalink: string = '';
  imgSrc: any = '././assets/p3.jpg';
  selectedImg: any;





  onTitleChange($event: any) {
    const title = $event.target.value;
    this.permalink = title.replaceAll(' ', '-');
  };

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }


  //this is the function based on saveStatus if its save it saves the data if its edit it edits the data 

  onsubmit() {
    if (this.saveStatus == 'save') {
      let splitted = this.postForm.value.catry.split('-');
      let date = new Date();

      const postdata: Post = {
        title: this.postForm.value.title,
        plink: this.postForm.value.plink,
        category: {
          categoryid: splitted[0],
          category: splitted[1]
        },
        excerpt: this.postForm.value.excerpt,
        content: this.postForm.value.content,
        postimgpath: '',
        isfeatured: false,
        views: 0,
        createdat: date


      }
      this.pS.uplad(this.selectedImg, postdata);
      this.postForm.reset();
      this.imgSrc = '././assets/p3.jpg';
    }
    else if (this.saveStatus == 'edit') {
      let splitted = this.postForm.value.catry.split('-');
      let date = new Date();

      const postdata: Post = {
        title: this.postForm.value.title,
        plink: this.postForm.value.plink,
        category: {
          categoryid: splitted[0],
          category: splitted[1]
        },
        excerpt: this.postForm.value.excerpt,
        content: this.postForm.value.content,
        postimgpath: this.fdata.postimgpath,
        isfeatured: false,
        views: 0,
        createdat: date
      }
      this.pS.uaplad(this.selectedImg, postdata, this.fdata.postimgpath, this.ddata);
      this.rat.navigate(['posts']);
      this.postForm.reset();
    };
  }


}
