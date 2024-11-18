import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableroPredictivoComponent} from './tableroPredictivo.component';

describe('TableroPredictivoComponent', () => {
  let component: TableroPredictivoComponent;
  let fixture: ComponentFixture<TableroPredictivoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TableroPredictivoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroPredictivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
