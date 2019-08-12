import { Post } from './../models/post';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  confermationStr: string = "New post has been added.";

  isAdded: boolean = false;
  id: number;
  post: Post;

  editMode = false;
  posts: any = [];

  editPostForm: FormGroup;

  constructor(private service: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.post = new Post();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //console.log(this.id);
    this.editMode = this.id != null;

    this.editPostForm = new FormGroup({
      'title': new FormControl(''),
      'body': new FormControl('')
    })


    if (this.editMode == true) {
      this.service.getPost(this.id).subscribe(responseData => {
        this.post = responseData;
        console.log(this.post);

        this.editPostForm.setValue({
          'title': this.post.title,
          'body': this.post.body

        })

      })
    }
  }

  onSubmit() {
    console.log(this.editPostForm);
    let post: Post = { id: this.id, title: this.editPostForm.value.title, body: this.editPostForm.value.body }

    if (this.editMode) {
      this.updatePost(post.id, post)
    }
    else {
      this.createPost(post)

    }
    this.editPostForm.reset();

  }

  updatePost(postId, post) {
    this.service.updatePost(postId, post)
      .subscribe(response => {
        this.router.navigate(['/']);
      })
  }

  createPost(post) {
    this.service.createPost(post)
      .subscribe(response => {
        console.log(response);
        this.isAdded = true;
        setTimeout(() => { this.isAdded = false; }, 3000);
      })
  }

}
