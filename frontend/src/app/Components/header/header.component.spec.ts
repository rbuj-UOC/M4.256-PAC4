import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from '../../Models/header-menus.dto';
import { HeaderMenusService } from '../../Services/header-menus.service';
import { LocalStorageService } from '../../Services/local-storage.service';
import { HeaderComponent } from './header.component';

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
  // declaramos la variable component de tipo HeaderComponent
  let component: HeaderComponent;
  // declaramos el "fixture" para poder gestionar posteriormente el "component"
  let fixture: ComponentFixture<HeaderComponent>;
  // declaramos el espía la función navigateByUrl del mockRouter
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  // antes de cada test
  beforeEach(() => {
    // configuración del test para un componente
    TestBed.configureTestingModule({
      providers: [
        HeaderMenusService,
        LocalStorageService,
        { provide: Router, useValue: mockRouter }
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
    // ejecutamos el método navigationTo con el argumento 'home' del HeaderComponent
    component.navigationTo('home');
    // Se espera que se lance un 'navigateByUrl con argumento 'home'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('home');
  });

  // Test 3: que naveguemos correctamente cuando se lance el método "navigationTo('login')"
  // del componente HeaderComponent
  it('should navigate to login', () => {
    // ejecutamos el método navigationTo con el argumento 'login' del HeaderComponent
    component.navigationTo('login');
    // Se espera que se lance un 'navigateByUrl con argumento 'login'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('login');
  });

  // Test 4: que naveguemos correctamente cuando se lance el método "navigationTo('register')"
  // del componente HeaderComponent
  it('should navigate to register', () => {
    // ejecutamos el método navigationTo con el argumento 'register' del HeaderComponent
    component.navigationTo('register');
    // Se espera que se lance un 'navigateByUrl con argumento 'register'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('register');
  });

  // Test 5: que naveguemos correctamente cuando se lance el método "navigationTo('posts')"
  // del componente HeaderComponent
  it('should navigate to posts', () => {
    // ejecutamos el método navigationTo con el argumento 'posts' del HeaderComponent
    component.navigationTo('posts');
    // Se espera que se lance un 'navigateByUrl con argumento 'posts'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('posts');
  });

  // Test 6: que naveguemos correctamente cuando se lance el método "navigationTo('categories')"
  // del componente HeaderComponent
  it('should navigate to categories', () => {
    // ejecutamos el método navigationTo con el argumento 'categories' del HeaderComponent
    component.navigationTo('categories');
    // Se espera que se lance un 'navigateByUrl con argumento 'categories'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('categories');
  });

  // Test 7: que naveguemos correctamente cuando se lance el método "navigationTo('profile')"
  // del componente HeaderComponent
  it('should navigate to profile', () => {
    // ejecutamos el método navigationTo con el argumento 'profile' del HeaderComponent
    component.navigationTo('profile');
    // Se espera que se lance un 'navigateByUrl con argumento 'profile'
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('profile');
  });

  // Ref: https://shashankvivek-7.medium.com/testing-basic-html-elements-using-karma-jasmine-in-angular-fd5e4ac62d78
  // Ref: https://medium.com/netanelbasal/testing-observables-in-angular-a2dbbfaf5329

  // logged
  it('should have Admin posts button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-posts'
    );
    expect(btn.innerHTML.trim()).toBe('Admin posts');
  });

  it('should have Admin categories button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-categories'
    );
    expect(btn.innerHTML.trim()).toBe('Admin categories');
  });

  it('should have Profile button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-profile'
    );
    expect(btn.innerHTML.trim()).toBe('Profile');
  });

  it('should have Logout button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: true,
      showNoAuthSection: false
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-logout'
    );
    expect(btn.innerHTML.trim()).toBe('Logout');
  });

  // NOT logged
  it('should have Home button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-home'
    );
    expect(btn.innerHTML).not.toBeNull();
    expect(btn.innerHTML.trim()).toBe('Home');
  });

  it('should have Login button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-login'
    );
    console.log(btn.innerHTML);
    expect(btn.innerHTML).not.toBeNull();
  });

  it('should have Register button', async () => {
    const headerMenusService =
      fixture.debugElement.injector.get(HeaderMenusService);
    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true
    };
    headerMenusService.headerManagement.next(headerInfo);
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.debugElement.nativeElement.querySelector(
      '#header__button-register'
    );
    console.log(btn.innerHTML);
    expect(btn.innerHTML).not.toBeNull();
  });
});
