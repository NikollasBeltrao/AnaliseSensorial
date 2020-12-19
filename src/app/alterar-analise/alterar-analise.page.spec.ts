import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarAnalisePage } from './alterar-analise.page';

describe('AlterarAnalisePage', () => {
  let component: AlterarAnalisePage;
  let fixture: ComponentFixture<AlterarAnalisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarAnalisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarAnalisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
