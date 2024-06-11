import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryTextComponent } from './lottery-text.component';

describe('LotteryTextComponent', () => {
  let component: LotteryTextComponent;
  let fixture: ComponentFixture<LotteryTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotteryTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
