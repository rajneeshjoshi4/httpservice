import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent implements OnInit {
  @ViewChild('form', { static: true }) editPostForm: NgForm;

  constructor(private service: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
