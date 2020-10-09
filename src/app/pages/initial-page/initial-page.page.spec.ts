import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InitialPagePage } from './initial-page.page';

describe('InitialPagePage', () => {
  let component: InitialPagePage;
  let fixture: ComponentFixture<InitialPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InitialPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
