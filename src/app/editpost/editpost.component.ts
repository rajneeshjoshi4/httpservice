import { Router, ActivatedRoute } from '@angular/router';
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
  id: number;
  posts = [];
  post: { title: string, body: string };
  editPostForm: FormGroup;

  constructor(private service: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.editPostForm = new FormGroup({
      'title': new FormControl('null'),
      'body': new FormControl('null')
    })

    this.service.getPosts().subscribe(responseData => {
      this.posts = responseData;
      var index = _.findIndex(responseData, { id: this.id })
      //console.log(index);
      this.post = this.posts[index];
      console.log(this.post);

      this.editPostForm.setValue({
        'title': this.post.title,
        'body': this.post.body

      })

    })
  }

  onUpdate() {
    console.log(this.editPostForm);
    let post: object = { id: this.id, title: this.editPostForm.value.title, body: this.editPostForm.value.body }
    this.service.updatePost(post)
      .subscribe(response => {
        this.editPostForm.reset();
        this.router.navigate(['/']);
      })

  }

}
