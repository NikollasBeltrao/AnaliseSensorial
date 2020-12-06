import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalisePage } from './analise.page';

describe('AnalisePage', () => {
  let component: AnalisePage;
  let fixture: ComponentFixture<AnalisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
