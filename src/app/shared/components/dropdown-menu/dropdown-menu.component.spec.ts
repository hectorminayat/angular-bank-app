import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuComponent } from './dropdown-menu.component';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.items).toEqual([]);
    expect(component.value).toBeNull();
    expect(component.selectedItem).toBe(0);
    expect(component.isOpen).toBeFalsy();
  });

  it('should toggle the dropdown', () => {
    component.toggleDropdown(new Event('click'));
    expect(component.isOpen).toBe(true);

    component.toggleDropdown(new Event('click'));
    expect(component.isOpen).toBe(false);
  });

  it('should select an item', () => {
    const itemIndex = 2;
    component.selectItem(itemIndex);
    expect(component.selectedItem).toBe(itemIndex);
    expect(component.isOpen).toBe(false);
    expect(component.onClick.emit).toHaveBeenCalledWith({ index: itemIndex, value: component.value });
  });

  it('should handle menu click', () => {
    const event = new Event('click');
    component.handleMenuClick(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});