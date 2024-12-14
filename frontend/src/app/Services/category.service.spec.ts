import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryDTO } from '../Models/category.dto';
import { CategoryService } from './category.service';

const categoriesList: CategoryDTO[] = [
  {
    userId: '',
    categoryId: '1',
    css_color: '',
    description: '',
    title: ''
  },
  {
    userId: '',
    categoryId: '2',
    css_color: '',
    description: '',
    title: ''
  },
  {
    userId: '',
    categoryId: '3',
    css_color: '',
    description: '',
    title: ''
  }
];

describe('CategoryService', () => {
  // declaramos una variable service de tipo CategoryService para llamar a las diferentes funciones del servicio
  let service: CategoryService;
  // declaramos la variable httpMock de tipo HttpTestingController para hacer las peticiones "mock", para no hacer peticiones reales
  let httpMock: HttpTestingController;

  // antes de cada test
  // Configuración necesaria para caca test del servicio
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(CategoryService);
  });

  // instancias necesarias para cada test del servicio
  beforeEach(() => {
    service = TestBed.inject(CategoryService);
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

  // TEST 2: comprobar que getCategoriesByUserId devuelve una lista de categorías y que es una llamada de tipo GET
  it('GET method and getCategoriesByUserId return a list of categories', () => {
    // llamaríamos al servicio, nos suscribimos y el resultado esperado seria que la respuesta fuera igual a "categoriesList" (objeto mock
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoriesList);
    });

    // definimos la petición "mock" a la url determinada
    const reg = httpMock.expectOne('http://localhost:3000/users/categories/1');

    // verificamos que el método sea de tipo GET
    expect(reg.request.method).toBe('GET');

    // lanzamos la petición: simula la petición, ésta nos devuelve un observable de tipo CategoryDTO[] y validamos que sea de tipo GET y que devuelva
    // el listado de categorías
    reg.flush(categoriesList);
  });
});
