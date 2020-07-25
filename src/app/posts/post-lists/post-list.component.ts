import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostsService } from "../posts.service";
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
@Component({
selector: 'app-post-list',
templateUrl: './post-list.component.html',
styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //   {title: 'First Post', content : 'This is the first post\'s content'},
  //   {title: 'Second Post', content : 'This is the second post\'s content'},
  //   {title: 'Third Post', content : 'This is the third post\'s content'},
  // ]

  posts: Post[] = [];
  isLoading = false;
  postsSub = new Subscription;

  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postsService.getPostUpdateListener().
    subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
}
