import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {

  @Input() items: string[] = [];
  @Input() value: any = null;
  @Output() onClick: EventEmitter<{index: number, value: any}> = new EventEmitter();

  selectedItem: number = 0;
  isOpen: boolean = false;
  private documentClickListener!: Function;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.documentClickListener = this.renderer.listen('document', 'click', (event: any) => {
      if (!this.elRef.nativeElement.contains(event.target)) {
        this.isOpen = false;
      }
    });
  }
  ngOnDestroy() {
    this.documentClickListener(); // Remove event listener on destroy
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: number) {
    this.selectedItem = item;
    this.isOpen = false; 
    this.onClick.emit({index: item, value: this.value})
  }

  handleMenuClick(event: Event) {
    event.stopPropagation(); // Prevent event bubbling up
  }
}
