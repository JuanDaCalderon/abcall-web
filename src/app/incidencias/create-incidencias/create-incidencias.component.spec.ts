import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateIncidenciasComponent} from './create-incidencias.component';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIncidenciasComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
