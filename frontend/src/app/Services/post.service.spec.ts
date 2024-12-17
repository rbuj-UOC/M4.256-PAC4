import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PostDTO } from '../Models/post.dto';
import { deleteResponse } from './category.service';
import { PostService, updateResponse } from './post.service';

const postList: PostDTO[] = [
  {
    postId: '1',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: ''
  },
  {
    postId: '2',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: ''
  },
  {
    postId: '3',
    title: '',
    description: '',
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(),
    categories: [],
    userId: '',
    userAlias: ''
  }
];

const post: PostDTO = {
  postId: '1',
  title: '',
  description: '',
  num_likes: 0,
  num_dislikes: 0,
  publication_date: new Date(),
  categories: [],
  userId: '',
  userAlias: ''
};

const delResponse: deleteResponse = {
  affected: 1
};

const updResponse: updateResponse = {
  affected: 1
};

describe('PostService', () => {
  // declaramos una variable service de tipo PostService para llamar a las diferentes funciones del servicio
  let service: PostService;
  // declaramos la variable httpMock de tipo HttpTestingController para hacer las peticiones "mock", para no hacer peticiones reales
  let httpMock: HttpTestingController;

  // antes de cada test
  // Configuración necesaria para caca test del servicio
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(PostService);
  });

  // instancias necesarias para cada test del servicio
  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // después ce cada test
  afterEach(() => {
    httpMock.verify(); // para que no se lance el siguiente test mientras haya peticiones pendientes
  });

  // TEST 1: comprobar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TEST 2: comprobar que getPosts devuelve una lista de posts y que es una llamada de tipo GET
  it('GET method and getPosts return a list of posts', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "postList" (objeto mock)
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts');

    // verificamos que el método sea de tipo GET
    expect(reg.request.method).toBe('GET');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo PostDTO[] y validamos que sea de tipo GET y que devuelva
    // el listado de posts
    reg.flush(postList);
  });

  // TEST 3: comprobar que getPostsByUserId devuelve una lista de posts y que es una llamada de tipo GET
  it('GET method and getPostsByUserId return a list of posts', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "postList" (objeto mock)
    service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/users/posts/1');

    // verificamos que el método sea de tipo GET
    expect(reg.request.method).toBe('GET');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo PostDTO[] y validamos que sea de tipo GET y que devuelva
    // el listado de posts
    reg.flush(postList);
  });

  // TEST 4: comprobar que createPost devuelve un post y que es una llamada de tipo POST
  it('POST method and createPost return a post', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "post" (objeto mock)
    service.createPost(post).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts');

    // verificamos que el método sea de tipo POST
    expect(reg.request.method).toBe('POST');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo PostDTO y validamos que sea de tipo POST y que devuelva un post
    reg.flush(post);
  });

  // TEST 5: comprobar que getPostById devuelve un post y que es una llamada de tipo GET
  it('GET method and getPostById return a post', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "post" (objeto mock)
    service.getPostById('1').subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts/1');

    // verificamos que el método sea de tipo GET
    expect(reg.request.method).toBe('GET');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo PostDTO y validamos que sea de tipo GET y que devuelva un post
    reg.flush(post);
  });

  // TEST 6: comprobar que updatePost devuelve un post y que es una llamada de tipo PUT
  it('PUT method and updatePost return a post', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "post" (objeto mock)
    service.updatePost('1', post).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts/1');

    // verificamos que el método sea de tipo PUT
    expect(reg.request.method).toBe('PUT');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo PostDTO y validamos que sea de tipo PUT y que devuelva un post
    reg.flush(post);
  });

  // TEST 7: comprobar que likePost devuelve un updateResponse y que es una llamada de tipo PUT
  it('PUT method and updatePost return a update response', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "updResponse" (objeto mock)
    service.likePost('1').subscribe((resp: updateResponse) => {
      expect(resp).toEqual(updResponse);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts/like/1');

    // verificamos que el método sea de tipo PUT
    expect(reg.request.method).toBe('PUT');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo updateResponse y validamos que sea de tipo PUT y que devuelva update response
    reg.flush(updResponse);
  });

  // TEST 8: comprobar que dislikePost devuelve un update response y que es una llamada de tipo PUT
  it('PUT method and dislikePost return a update response', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "updResponse" (objeto mock)
    service.dislikePost('1').subscribe((resp: updateResponse) => {
      expect(resp).toEqual(updResponse);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts/dislike/1');

    // verificamos que el método sea de tipo PUT
    expect(reg.request.method).toBe('PUT');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo updateResponse y validamos que sea de tipo PUT y que devuelva update response
    reg.flush(updResponse);
  });

  // TEST 8: comprobar que deletePost devuelve un delete response y que es una llamada de tipo DELETE
  it('DELETE method and deletePost return a delete response', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "updResponse" (objeto mock)
    service.deletePost('1').subscribe((resp: deleteResponse) => {
      expect(resp).toEqual(delResponse);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/posts/1');

    // verificamos que el método sea de tipo DELETE
    expect(reg.request.method).toBe('DELETE');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo updateResponse y validamos que sea de tipo DELETE y que devuelva delete response
    reg.flush(delResponse);
  });
});
