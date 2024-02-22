import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../models/Product';
import { ProductRequest } from '../../models/ProductRequest';

@Injectable({
  providedIn: 'root',

})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('bp/products').pipe(
      map((products: any[]) => products.map(product => {
        return { ...product, dateRelease: product['date_release'], dateRevision: product['date_revision'] }
      }))
    );
  }

  checkExists(id: string): Observable<boolean> {
    return this.http.get<boolean>('bp/products/verification', { params: { id: id } })
  }

  create(body: ProductRequest): Observable<Product> {
    return this.http.post<Product>('bp/products', body);
  }

  edit(body: ProductRequest): Observable<Product> {
    return this.http.put<Product>('bp/products', body);
    
  }

  delete(id: string): Observable<string> {
    return this.http.delete('bp/products', { params: { id: id }, responseType:"text"})
  }

}
