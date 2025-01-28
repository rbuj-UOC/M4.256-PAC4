import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from '../../../Models/category.dto';
import {
  CategoryService,
  deleteResponse
} from '../../../Services/category.service';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-categories-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {
  categories!: CategoryDTO[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.loadCategories();
  }

  private loadCategories(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.categoryService.getCategoriesByUserId(userId).subscribe(
        (categories: CategoryDTO[]) => {
          this.categories = categories;
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  deleteCategory(categoryId: string): void {
    let errorResponse: any;

    // show confirmation popup
    const result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            this.loadCategories();
          }
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
