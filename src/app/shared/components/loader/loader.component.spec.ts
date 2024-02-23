import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loader component', () => {
    expect(component).toBeTruthy();
  });

  it('should have show input property', () => {
    expect(component.show).toBeDefined();
  });

  it('should initialize show input property to false', () => {
    expect(component.show).toBe(false);
  });
});