const perPage = 6;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(page, tag, category): Observable<BlogPost[]> {
    let link = `https://afrancoweb422.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`;

    if (tag != '' && tag != null) {
      link += `&tag=${tag}`;
    }

    if (category != null && tag != '') {
      link += `&category=${category}`;
    }

    return this.http.get<BlogPost[]>(link);
  }

  getPostbyId(id): Observable<BlogPost> {

    return this.http.get<BlogPost>(
      `https://afrancoweb422.herokuapp.com/api/posts/${id}`

    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(
      'https://afrancoweb422.herokuapp.com/api/categories'
    );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(
      'https://afrancoweb422.herokuapp.com/api/tags'
    );
  }


  getAllPosts(): Observable<BlogPost[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }

    return this.http.get<BlogPost[]>(`https://afrancoweb422.herokuapp.com/api/posts`,{ params });
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://afrancoweb422.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://afrancoweb422.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://afrancoweb422.herokuapp.com/api/posts/${id}`);
  }

}