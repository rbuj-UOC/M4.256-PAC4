import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  // declaramos la variable component de tipo HeaderComponent
  let component: HeaderComponent;
  // declaramos el "fixture" para poder gestionar posteriormente el "component"
  let fixture: ComponentFixture<HeaderComponent>;

  // antes de cada test
  beforeEach(() => {
    // configuración del test para un componente
    TestBed.configureTestingModule({
      // nos hace falta importar el módulo para testear rutas
      imports: [
        // declararíamos todas las rutas a testear
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            // en component tendríamos que poner el HomeComponent, pero para no tener que importar todas las
            // dependencias del HomeComponent y ensuciar asi el test del HeaderComponent, lo que podemos
            // hacer es crear una clase TemporalComponentForRoutes "vacía"
            component: TemporalComponentForRoutes
          }
        ])
      ],
      declarations: [HeaderComponent],
      // esto se suele poner para evitar errores
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      // importante ejecutar el compileComponents
    }).compileComponents();
  });

  // antes de cada test
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // hacemos que se instancie el componente y pase por el ngOnInit
    fixture.detectChanges();
  });

  // TEST 1: que se cree correctamente el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: que naveguemos correctamente cuando se lance el método "navigationTo('home')"
  // del componente HeaderComponent
  it('should navigate to home', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'home' del HeaderComponent
    component.navigationTo('home');
    // Se espera que se lance un 'navigateByUrl con argumento 'home'
    expect(spy).toHaveBeenCalledWith('home');
  });

  // Test 3: que naveguemos correctamente cuando se lance el método "navigationTo('login')"
  // del componente HeaderComponent
  it('should navigate to login', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'login' del HeaderComponent
    component.navigationTo('login');
    // Se espera que se lance un 'navigateByUrl con argumento 'login'
    expect(spy).toHaveBeenCalledWith('login');
  });

  // Test 4: que naveguemos correctamente cuando se lance el método "navigationTo('register')"
  // del componente HeaderComponent
  it('should navigate to register', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'register' del HeaderComponent
    component.navigationTo('register');
    // Se espera que se lance un 'navigateByUrl con argumento 'register'
    expect(spy).toHaveBeenCalledWith('register');
  });

  // Test 5: que naveguemos correctamente cuando se lance el método "navigationTo('posts')"
  // del componente HeaderComponent
  it('should navigate to posts', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'posts' del HeaderComponent
    component.navigationTo('posts');
    // Se espera que se lance un 'navigateByUrl con argumento 'posts'
    expect(spy).toHaveBeenCalledWith('posts');
  });

  // Test 6: que naveguemos correctamente cuando se lance el método "navigationTo('categories')"
  // del componente HeaderComponent
  it('should navigate to categories', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'categories' del HeaderComponent
    component.navigationTo('categories');
    // Se espera que se lance un 'navigateByUrl con argumento 'categories'
    expect(spy).toHaveBeenCalledWith('categories');
  });

  // Test 7: que naveguemos correctamente cuando se lance el método "navigationTo('profile')"
  // del componente HeaderComponent
  it('should navigate to profile', () => {
    // declaramos el router
    const router = TestBed.inject(Router);
    // espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
    const spy = spyOn(router, 'navigateByUrl');
    // ejecutamos el método navigationTo con el argumento 'profile' del HeaderComponent
    component.navigationTo('profile');
    // Se espera que se lance un 'navigateByUrl con argumento 'profile'
    expect(spy).toHaveBeenCalledWith('profile');
  });
});
