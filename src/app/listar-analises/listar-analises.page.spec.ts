import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarAnalisesPage } from './listar-analises.page';

describe('ListarAnalisesPage', () => {
  let component: ListarAnalisesPage;
  let fixture: ComponentFixture<ListarAnalisesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarAnalisesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarAnalisesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
