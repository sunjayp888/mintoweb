// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../shared/constant';
import { ServiceCategory } from '../models/service-category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getServiceCategories(customerId: number): Observable<ServiceCategory[]> {
    const url = `${this.baseUrl}/customer/home`;
    const body = { customer_id: customerId };

    return this.http.post<{ result: { service_categories: ServiceCategory[] } }>(url, body)
      .pipe(
        // If you want to extract the `service_categories` array from the API response
        map(response => response.result.service_categories)
      );
  }
}
