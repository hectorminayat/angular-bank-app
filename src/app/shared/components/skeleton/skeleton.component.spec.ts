
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values for width, height, radius, and className', () => {
    expect(component.width).toBe('100%');
    expect(component.height).toBe('20px');
    expect(component.radius).toBe('6px');
    expect(component.className).toBe('');
  });

  it('should add className to host element if className is provided', () => {
    const hostElement = fixture.nativeElement;
    component.className = 'custom-class';
    fixture.detectChanges();
    expect(hostElement.classList.contains('custom-class')).toBe(true);
  });

  it('should set CSS variables for width, height, and radius on host element', () => {
    const hostElement = fixture.nativeElement;
    component.width = '200px';
    component.height = '30px';
    component.radius = '10px';
    fixture.detectChanges();
    expect(hostElement.style.getPropertyValue('--skeleton-rect-width')).toBe('200px');
    expect(hostElement.style.getPropertyValue('--skeleton-rect-height')).toBe('30px');
    expect(hostElement.style.getPropertyValue('--skeleton-rect-radius')).toBe('10px');
  });
});