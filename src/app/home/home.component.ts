import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';  // For handling form input
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../services/api.service';
import { ServiceCategory } from '../models/service-category.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, MatCardModule, MatAutocompleteModule],  // Import Material Input & Button
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  searchText: string = '';  // Variable to store the search input
  placeholderText: string = '';  // Variable for placeholder text
  animate: boolean = false;  // Animation trigger

  // Hardcoded data for brands and mobiles
  brands: string[] = ['Samsung', 'Apple', 'Vivo', 'OnePlus'];
  mobiles: string[] = [];
  brandMobileMap: { [key: string]: string[] } = {
    'Samsung': ['Samsung Galaxy S21', 'Samsung Galaxy Note 10', 'Samsung V20'],
    'Apple': ['iPhone 12', 'iPhone 13', 'iPhone 14'],
    'Vivo': ['Vivo Y91', 'Vivo X60', 'Vivo V20'],
    'OnePlus': ['OnePlus 9', 'OnePlus 8T', 'OnePlus Nord']
  };

  filteredBrands: string[] = [];
  filteredMobiles: string[] = [];
  selectedBrand: string = '';
  selectedMobile: string = '';

  mobilesByBrand: { [brand: string]: string[] } = {
    Samsung: ['Galaxy S21', 'Galaxy Note 10', 'Galaxy A50'],
    Apple: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
    Vivo: ['Vivo Y20', 'Vivo X50', 'Vivo Z1'],
    OnePlus: ['OnePlus 8', 'OnePlus 9', 'OnePlus Nord']
  };

  // Array of placeholder options
  placeholderOptions: string[] = [
    'Search your mobile Vivo Y91',
    'Search your mobile iPhone 13',
    'Search your mobile OnePlus 9R'
  ];
  mobileList: any[] = []; // List of mobiles to be displayed
  customerId = 123; // Example customer ID, this could come from user input or another source
  isLoading = true; // Loading indicator
  serviceCategories: ServiceCategory[] = [];
  private imageBaseUrl = 'https://rymo.macrowebtech.com/public/uploads/';  // Base URL for the images

  constructor(private apiService: ApiService) {
    this.startPlaceholderRotation();
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.fetchMobileList();
    this.filteredBrands = this.brands; // Initially, show all brands
  }


  // Function to rotate the placeholder text
  startPlaceholderRotation() {
    let index = 0;
    this.placeholderText = this.placeholderOptions[index];  // Initial placeholder
    setInterval(() => {
      index = (index + 1) % this.placeholderOptions.length;  // Cycle through the options
      this.placeholderText = this.placeholderOptions[index];
    }, 3000);  // Change placeholder every 3 seconds
  }

  // Method to handle search logic
  onSearch() {
    console.log("Search text:", this.searchText);
  }

  // Method to fetch the list of mobiles using the service
  fetchMobileList(): void {
    this.apiService.getServiceCategories(123).subscribe((categories: ServiceCategory[]) => {
      this.serviceCategories = categories;
      console.log(this.serviceCategories);  // Check the data in the console
    });

    // this.apiService.getMobileList(this.customerId).subscribe({
    //   next: (data) => {
    //     this.mobileList = data; // Assuming the API returns an array of mobiles
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error fetching mobile list', error);
    //     this.isLoading = false;
    //   }
    // });
  }


  // Handle input in brand autocomplete
  onBrandInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;  // Correct casting
    this.filteredBrands = this.brands.filter(brand =>
      brand.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  // Handle brand selection
  onBrandChange(brand: string): void {
    this.selectedBrand = brand;
    this.filteredMobiles = this.mobilesByBrand[this.selectedBrand] || [];
    // You can now load mobile options based on selected brand
  }


  // Handle search button click
  onMobileSearch(): void {
    if (this.selectedBrand && this.selectedMobile) {
      console.log('Search initiated for', this.selectedBrand, this.selectedMobile);
      // Trigger search or any action here
    } else {
      console.log('Please select both brand and mobile.');
    }
  }

  // Helper function to generate full image URL
  getFullImageUrl(imagePath: string): string {
    return `${this.imageBaseUrl}${imagePath}`;
  }
}
