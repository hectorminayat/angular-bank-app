import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  constructor(private router:Router) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
}

}
