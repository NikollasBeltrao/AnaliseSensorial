import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CriarAnalisePage } from './criar-analise.page';

describe('CriarAnalisePage', () => {
  let component: CriarAnalisePage;
  let fixture: ComponentFixture<CriarAnalisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarAnalisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CriarAnalisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
