import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLayoutComponent } from './contact-layout.component';

describe('ContactLayoutComponent', () => {
  let component: ContactLayoutComponent;
  let fixture: ComponentFixture<ContactLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
