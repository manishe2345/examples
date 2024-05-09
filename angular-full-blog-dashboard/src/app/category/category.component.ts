import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Catgor } from '../models/catgor';


interface CategoryItem {
id: any;
data: {Catgor:string};
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
   



  constructor(private cS: CategoryService) { }
  categoryArray : Array<CategoryItem>=[];
  formCategory : string ="";
  formStatus : string ="Add";
  categoryId : string =""

  ngOnInit(): void {
    this.cS.loadData().subscribe( val => {
      this.categoryArray = val;
      console.log(this.categoryArray)
    })
   }
  onSubmit(formData: any) {
    let categoryData: Catgor = {
      Catgor: formData.value.category
    }
    if(this.formStatus=="Add"){
      this.cS.saveData(categoryData);
    formData.reset();
    }
    else if(this.formStatus=="Edit"){
      this.cS.updateData(this.categoryId, categoryData);
      this.formStatus="Add"
      formData.reset();
    }
  }
  onEdit(category:any,id:any){
    this.formCategory=category;
    this.formStatus="Edit";
    this.categoryId=id
  }
  onDelete(id:any){
    this.cS.deleteData(id)
  }
}
