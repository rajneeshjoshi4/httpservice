import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('form', { static: true }) inputPostForm: NgForm;
  posts: any;

  constructor(private service: PostService) {
    //this.dataUrl = 

  }


  createPost(titleValue, bodyValue) {
    let post: any = { title: titleValue, body: bodyValue };
    this.service.createPost(post)
      .subscribe(response => {
        post.id = this.posts[this.posts.length - 1].id + 1;
        this.posts.push(post);
        console.log(response);
      })
  }

  updatePost(post) {
      this.service.updatePost(post)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts[index].title = this.inputPostForm.value.title;
        this.posts[index].body = this.inputPostForm.value.body;
        console.log(response);
      })

  }

  deletePost(post) {
    this.service.deletePost(post)
      .subscribe(response => {
        let index = this.posts.indexOf(post)
        this.posts.splice(index, 1);
      })

  }


  onSubmit() {
    //console.log(this.inputPostForm.value.title, this.inputPostForm.value.body);
    this.createPost(this.inputPostForm.value.title, this.inputPostForm.value.body);

    this.inputPostForm.reset();
  }

  onEdit() {

  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts);
      })
  }

}
