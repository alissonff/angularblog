import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {BlogPost} from '../BlogPost';
import { PostService } from '../post-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  querySub: any;

  comment: Comment = new Comment();
  commentName: string;
  commentText: string;

  constructor( private data: PostService, private route: ActivatedRoute) { }

  submitComment() {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });

    this.data.updatePostById(this.post._id, this.post)
      .subscribe((data) => {
        this.commentName = null;
        this.commentText = null;
      });
  }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.data
        .getPostbyId(params["id"])
        .subscribe(post => {
          this.post = post;
          this.post.views += 1;
          this.data.updatePostById(this.post._id, this.post).subscribe();
        });
        window.scrollTo(0,0);
    });
  }

  ngOnDestroy(){
    if(this.querySub){
      this.querySub.unsubscribe();
    }
  }

}
