import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostDTO } from '../../../Models/post.dto';
import { deleteResponse } from '../../../Services/category.service';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { PostService } from '../../../Services/post.service';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-posts-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent {
  posts!: PostDTO[];
  constructor(
    private postService: PostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.loadPosts();
  }

  private loadPosts(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.postService.getPostsByUserId(userId).subscribe(
        (posts: PostDTO[]) => {
          this.posts = posts;
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    let errorResponse: any;

    // show confirmation popup
    const result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.postService.deletePost(postId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            this.loadPosts();
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
