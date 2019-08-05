import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('form', { static: true }) inputPostForm: NgForm;
  posts: any;
  dataUrl: 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {

  }

  getPost() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe(response => {
        this.posts = response;
        console.log(this.posts)
      })
  }

  createPost(title, body) {
    let post: any = { title: title, body: body };
    this.http.post('https://jsonplaceholder.typicode.com/posts', post)
      .subscribe(response => {
        post.id = response.id;
        this.posts.splice(this.posts.length, 0, post);
        console.log(response);
      })
  }
  

  onSubmit() {
    //console.log(this.inputPostForm.value.title, this.inputPostForm.value.body);

    this.inputPostForm.reset();
  }

  ngOnInit() {
    this.getPost();
  }

}
