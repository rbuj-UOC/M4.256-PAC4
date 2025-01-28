import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PostDTO } from '../../../Models/post.dto';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { PostService } from '../../../Services/post.service';
import { SharedService } from '../../../Services/shared.service';
import { PostsListComponent } from './posts-list.component';

describe('PostsListComponent', () => {
  // declaramos la variable component de tipo PostsListComponent
  let component: PostsListComponent;
  // declaramos el "fixture" para poder gestionar posteriormente el "component"
  let fixture: ComponentFixture<PostsListComponent>;
  // declaramos el espía la función navigateByUrl del mockRouter
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };
  // antes de cada test
  beforeEach(() => {
    // configuración del test para un componente
    // aquí tenemos que importar y vincular todas las dependencias
    TestBed.configureTestingModule({
      // nos hace falta importar el módulo para testear llamadas a una API pero de manera simulada
      imports: [HttpClientTestingModule],
      // en declarations ponemos el componente a testear
      declarations: [PostsListComponent],
      // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
      providers: [
        PostService,
        LocalStorageService,
        SharedService,
        { provide: Router, useValue: mockRouter }
      ],
      // esto se suele poner para evitar errores
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      // importante ejecutar el compileComponents
    }).compileComponents();
  });

  // antes de cada test: instanciamos el componente
  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
    fixture.detectChanges();
  });

  // TEST 1: que se cree correctamente el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: load posts success
  it('loadPosts success from subscription', () => {
    // definimos la dependencia del servicio
    const postService = fixture.debugElement.injector.get(PostService);
    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    // lista de post "mock", en este ejemplo simplemente utilizamos una lista vacía
    const listPosts: PostDTO[] = [];
    // definimos la clave user_id del localStorage
    localStorageService.set('user_id', '1');
    // espía para simular el método getPostsByUserId del servicio
    // le decimos que nos devolverá una lista de posts y que será un observable, de ahi que utilicemos (of)
    const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(
      of(listPosts)
    );
    // llamamos al método privado loadPosts del componente PostsListComponent
    component['loadPosts']();
    // Que esperamos? esperamos que el getPostsByUserId del PostService sea llamado
    expect(spy).toHaveBeenCalled();
    // Que esperamos?
    // esperamos que la variable posts del PostsListComponent donde se mapea el resultado de la llamada anterior
    // tenga el número de posts correcto, en este caso, como listPosts "mock" tiene 0 posts, el resultado esperado tiene que ser 0
    expect(component.posts.length).toBe(0);
  });

  // TEST 3: create post success
  it('createPost success from navigateByUrl', () => {
    // llamamos al método privado createPost del componente PostsListComponent
    component['createPost']();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/post/');
  });

  // TEST 4: update post success
  it('updatePost success from navigateByUrl', () => {
    // llamamos al método privado updatePost del componente PostsListComponent
    component['updatePost']('1');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/post/1');
  });
});
