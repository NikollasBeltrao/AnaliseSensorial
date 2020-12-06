import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastrarAmostraPage } from './cadastrar-amostra.page';

describe('CadastrarAmostraPage', () => {
  let component: CadastrarAmostraPage;
  let fixture: ComponentFixture<CadastrarAmostraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarAmostraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarAmostraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
