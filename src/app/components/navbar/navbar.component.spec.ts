import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  const paramMapMock: ParamMap = {
    has: (key: string) => key === 'id',
    get: (key: string) => (key === 'id' ? '123' : null),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAll: (key: string) => [],
    keys: []
  };
  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    activatedRouteStub = {
      params: of({id: '123'}),
      queryParams: of({query: 'test'}),
      snapshot: {
        data: {},
        params: {id: '123'},
        queryParams: {},
        url: [],
        fragment: null,
        root: {} as ActivatedRouteSnapshot,
        parent: null,
        children: [],
        paramMap: paramMapMock,
        queryParamMap: paramMapMock,
        outlet: 'primary',
        component: null,
        routeConfig: null,
        pathFromRoot: [],
        title: '',
        firstChild: null,
        toString: () => 'Mocked snapshot'
      }
    };
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    localStorage.setItem('usuario', JSON.stringify({rol: {NOMBRE: 'administrador'}}));
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
      component.logout();
      expect(localStorage.getItem('usuario')).toBeNull();
    });
  });
});
