import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsuarioLogadoPage } from './usuario-logado.page';

describe('UsuarioLogadoPage', () => {
  let component: UsuarioLogadoPage;
  let fixture: ComponentFixture<UsuarioLogadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioLogadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioLogadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
