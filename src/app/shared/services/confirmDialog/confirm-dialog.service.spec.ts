import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  let service: ConfirmDialogService;

  beforeEach(() => {
    service = new ConfirmDialogService();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with "close" display value', () => {
    service.watch().subscribe((value) => {
      expect(value).toBe('close');
    });
  });

  it('should emit "open" when open() is called', () => {
    service.open();
    service.watch().subscribe((value) => {
      expect(value).toBe('open');
    });
  });

  it('should emit "close" when close() is called', () => {
    service.close();
    service.watch().subscribe((value) => {
      expect(value).toBe('close');
    });
  });
});