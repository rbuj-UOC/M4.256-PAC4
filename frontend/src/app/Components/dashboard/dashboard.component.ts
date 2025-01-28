import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostDTO } from '../../Models/post.dto';
import { PostService } from '../../Services/post.service';
import { SharedService } from '../../Services/shared.service';

@Component({
  selector: 'app-dashboard',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts!: PostDTO[];

  numLikes = 0;
  numDislikes = 0;

  constructor(
    private postService: PostService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    let errorResponse: any;

    this.postService.getPosts().subscribe(
      (posts: PostDTO[]) => {
        this.posts = posts;
        this.posts.forEach((post) => {
          this.numLikes = this.numLikes + post.num_likes;
          this.numDislikes = this.numDislikes + post.num_dislikes;
        });
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
