import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private dataUrl: string = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }


  getPosts() {
    return this.http.get(this.dataUrl)
  }

  createPost(post) {
    return this.http.post(this.dataUrl, post)
  }

  updatePost(post) {
    return this.http.put(this.dataUrl + '/' + post.id, post)
  }
  
  deletePost(post) {
    return this.http.delete(this.dataUrl + '/' + post.id)
  }


}
