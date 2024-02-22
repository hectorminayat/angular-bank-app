import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total number of pages correctly', () => {
    component.totalItems = 25;
    component.itemsPerPage = 5;
    expect(component.totalPages).toBe(5);
  });

  it('should emit the correct page number when changePage is called', () => {
    spyOn(component.pageChanged, 'emit');
    component.totalItems = 25;
    component.itemsPerPage = 5;
    component.changePage(3);
    expect(component.currentPage).toBe(3);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(3);
  });

  it('should emit the correct items per page when changeItemsPerPage is called', () => {
    spyOn(component.itemsPerPageChanged, 'emit');
    component.changeItemsPerPage('10');
    expect(component.itemsPerPage).toBe(10);
    expect(component.itemsPerPageChanged.emit).toHaveBeenCalledWith(10);
  });
});