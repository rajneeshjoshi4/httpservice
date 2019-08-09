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
  editMode = false;
  posts: any = [];
  post: { title: string, body: string };
  editPostForm: FormGroup;

  constructor(private service: PostService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      //console.log(this.editMode);
    });

    this.editPostForm = new FormGroup({
      'title': new FormControl(''),
      'body': new FormControl('')
    })

    if (this.editMode == true) {
      this.service.getPosts().subscribe(responseData => {
        this.posts = responseData;
        var findPost: any = _.find(responseData, { id: this.id })
        //console.log(index);
        this.post = findPost;

        // var index = _.findIndex(responseData, { id: this.id })
        // this.post = this.posts[index];
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
    let post: object = { id: this.id, title: this.editPostForm.value.title, body: this.editPostForm.value.body }

    if (this.editMode) {
      this.service.updatePost(post)
        .subscribe(response => {
          this.router.navigate(['/']);
        })
    }
    else {
      this.service.createPost(post)
        .subscribe(response => {
          console.log(response);
          this.isAdded = true;
          setTimeout(() => { this.isAdded = false; }, 3000);
        })
    }
    this.editPostForm.reset();

  }

}
