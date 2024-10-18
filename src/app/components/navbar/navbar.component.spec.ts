import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    const storedUsuario = localStorage.getItem('usuario');
    component.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should remove usuario from localStorage and navigate to root', () => {
      localStorage.setItem('usuario', JSON.stringify({rol: 'Admin'}));
      component.logout();
      expect(localStorage.getItem('usuario')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
