import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  @ViewChild('form', { static: true }) inputPostForm: NgForm;
  confermationStr: string = "New post has been added.";
  isAdded: boolean = false;

  constructor(private service: PostService) { }

  ngOnInit() {
  }

  createPost() {
    let post: object = { title: this.inputPostForm.value.title, body: this.inputPostForm.value.body };
    this.service.createPost(post)
      .subscribe(response => {
        console.log(response);
        this.isAdded = true;
        setTimeout(() => { this.isAdded = false; }, 3000);
      })
    this.inputPostForm.reset();
  }

}
