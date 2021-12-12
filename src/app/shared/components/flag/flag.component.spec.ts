import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlagComponent } from './flag.component';

describe('FlagComponent', () => {
  let component: FlagComponent;
  let fixture: ComponentFixture<FlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagComponent);
    component = fixture.componentInstance;
    component.flag.imgDown = '../../assets/imgs/united_kingdom_heart_icon_64.png';
    component.flag.imgUp = '../../assets/imgs/united_kingdom_round_icon_64.png';
    component.flag.selected = Math.random() > 0.5;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
