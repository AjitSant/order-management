import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

interface OrderDataInterface
    { name: any; description?: string; category?: string; brand?: string; model?: string; qty?: string; mrp?: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  orderData = [{
    name:'order1',
    description:'this is order 1',
    category:'simple',
    brand:'brand',
    model:'1',
    qty: '2',
    mrp:'900',
    allowEdit:false
  },
  {
    name:'order2',
    description:'this is order 2',
    category:'simple',
    brand:'brand',
    model:'1',
    qty: '2',
    mrp:'900',
    allowEdit:false
  },
  {
    name:'order3',
    description:'this is order 3',
    category:'complex',
    brand:'brand',
    model:'1',
    qty: '20',
    mrp:'800',
    allowEdit:false
  },
  {
    name:'order4',
    description:'this is order 4',
    category:'simple',
    brand:'brand',
    model:'1',
    qty: '9',
    mrp:'900',
    allowEdit:false
  },
  {
    name:'order5',
    description:'this is order 5',
    category:'complex',
    brand:'brand',
    model:'1',
    qty: '6',
    mrp:'1000',
    allowEdit:false
  }];
  

  orderForm = this.fb.group({
    lessons: this.fb.array([])
  });

  constructor(private fb: FormBuilder){
  }
  ngOnInit(): void {
    this.initOrderForm();
    console.log(this.orderForm);
  }
  initOrderForm() {
    const len = this.orderData.length;
    for(let i=0;i<len;i++){
      this.addLesson(this.orderData[i]);
    }
  }

  get lessons() {
    return this.orderForm.controls["lessons"] as FormArray;
  }

  addLesson(orderData: OrderDataInterface) {
    const lessonForm = this.fb.group({
      name: [orderData.name, Validators.required],
      description: [orderData.description, Validators.required],
      category: [orderData.category, Validators.required],
      brand: [orderData.brand, Validators.required],
      model: [orderData.model, Validators.required],
      qty: [orderData.qty, Validators.required],
      mrp: [orderData.mrp, Validators.required],
    });
    this.lessons.push(lessonForm);
  }

  editOrder(i:number){
    this.orderData[i].allowEdit = true;
  }

  afterEditOrder(i:number){
    const editData = (<FormArray>this.orderForm.get('lessons')).controls[i].value;
    this.orderData[i]={...editData};
    this.orderData[i].allowEdit = false;
  }

  deleteOrder(i:number){
    this.orderData.splice(i,1);
  }

  createOrder(){
    const order = {
      name:'',
      description:'',
      category:'',
      brand:'',
      model:'',
      qty: '',
      mrp:'',
      allowEdit:true
    }
    this.addLesson(order);
    this.orderData.push(order);
  }
}
