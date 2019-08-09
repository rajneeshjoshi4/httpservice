import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('form', { static: true }) inputPostForm: NgForm;
  posts: any = [];

  constructor(private service: PostService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  deletePost(post) {
    //console.log(post);
    if (confirm('Are you sure?')) {
      this.service.deletePost(post)
        .subscribe(response => {
          let index = this.posts.indexOf(post)
          this.posts.splice(index, 1);
        })
    }
  }

  nvaigateToAdd() {
    this.router.navigate(['addPost'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        this.posts = response;
        //console.log(this.posts);
      })

    //compunnal  example
    this.service.getApprovedStatus().subscribe(responseData => {
      //console.log(responseData.Content.Result);
      console.log(responseData);
    })
  }
}
