import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  host: {
    'class': 'pulse'
  },
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.css'
})
export class SkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() radius: string = '6px';
  @Input() className: string = '';

  constructor(private host: ElementRef) { }

  ngOnInit() {
    const host = this.host.nativeElement;

    if (this.className) {
      host.classList.add(this.className);
    }
    host.style.setProperty('--skeleton-rect-width', this.width);
    host.style.setProperty('--skeleton-rect-height', this.height);
    host.style.setProperty('--skeleton-rect-radius', this.radius);
  }

}
