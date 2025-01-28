import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CategoryDTO } from '../../../Models/category.dto';
import { CategoryService } from '../../../Services/category.service';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { SharedService } from '../../../Services/shared.service';
import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  // declaramos la variable component de tipo CategoriesListComponent
  let component: CategoriesListComponent;
  // declaramos el "fixture" para poder gestionar posteriormente el "component"
  let fixture: ComponentFixture<CategoriesListComponent>;
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
      declarations: [CategoriesListComponent],
      // dependencias (normalmente los servicios que tenga inyectados el componente en su constructor)
      providers: [
        CategoryService,
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
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    // hacemos que se instancie el componente y con el detectChanges es como si pasara por el ngOnInit
    fixture.detectChanges();
  });

  // TEST 1: que se cree correctamente el componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TEST 2: load categories success
  it('loadCategories success from subscription', () => {
    // definimos la dependencia del servicio
    const categoryService = fixture.debugElement.injector.get(CategoryService);
    const localStorageService =
      fixture.debugElement.injector.get(LocalStorageService);
    // lista de post "mock", en este ejemplo simplemente utilizamos una lista vacía
    const listCategories: CategoryDTO[] = [];
    // definimos la clave user_id del localStorage
    localStorageService.set('user_id', '1');
    // espía para simular el método getCategoriesByUserId del servicio
    // le decimos que nos devolverá una lista de categorías y que será un observable, de ahi que utilicemos (of)
    const spy = spyOn(categoryService, 'getCategoriesByUserId').and.returnValue(
      of(listCategories)
    );
    // llamamos al método privado loadCategories del componente CategoriesListComponent
    component['loadCategories']();
    // Que esperamos? esperamos que el getCategoriesByUserId del CategoryService sea llamado
    expect(spy).toHaveBeenCalled();
    // Que esperamos?
    // esperamos que la variable categories del CategoriesListComponent donde se mapea el resultado de la llamada anterior
    // tenga el número de categorías correcto, en este caso, como listCategories "mock" tiene 0 posts, el resultado esperado tiene que ser 0
    expect(component.categories.length).toBe(0);
  });

  // TEST 3: create category success
  it('createCategory success from navigateByUrl', () => {
    // llamamos al método privado createCategory del componente CategoriesListComponent
    component['createCategory']();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/category/');
  });

  // TEST 4: update category success
  it('updateCategory success from navigateByUrl', () => {
    // llamamos al método privado updateCategory del componente CategoriesListComponent
    component['updateCategory']('1');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/user/category/1');
  });
});
