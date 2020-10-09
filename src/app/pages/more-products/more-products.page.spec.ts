import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreProductsPage } from './more-products.page';

describe('MoreProductsPage', () => {
  let component: MoreProductsPage;
  let fixture: ComponentFixture<MoreProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
