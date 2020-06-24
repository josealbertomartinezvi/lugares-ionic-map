import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaLugaresPage } from './lista-lugares.page';

describe('ListaLugaresPage', () => {
  let component: ListaLugaresPage;
  let fixture: ComponentFixture<ListaLugaresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaLugaresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaLugaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
