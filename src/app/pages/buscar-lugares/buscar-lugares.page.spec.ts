import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuscarLugaresPage } from './buscar-lugares.page';

describe('BuscarLugaresPage', () => {
  let component: BuscarLugaresPage;
  let fixture: ComponentFixture<BuscarLugaresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarLugaresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarLugaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
