import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListarRespostasPage } from './listar-respostas.page';

describe('ListarRespostasPage', () => {
  let component: ListarRespostasPage;
  let fixture: ComponentFixture<ListarRespostasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarRespostasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarRespostasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
