import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecBoxComponent } from './chec-box.component';

describe('ChecBoxComponent', () => {
  let component: ChecBoxComponent;
  let fixture: ComponentFixture<ChecBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ChecBoxComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ChecBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
