import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingAuthComponent } from './selling-auth.component';

describe('SellingAuthComponent', () => {
  let component: SellingAuthComponent;
  let fixture: ComponentFixture<SellingAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
