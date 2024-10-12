import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RolesPermisosComponent} from './roles-permisos.component';
import {HttpClientModule} from '@angular/common/http';

describe('RolesPermisosComponent', () => {
  let component: RolesPermisosComponent;
  let fixture: ComponentFixture<RolesPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesPermisosComponent, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RolesPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
