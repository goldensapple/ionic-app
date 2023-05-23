import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonitorOptionsPage } from './monitor-options.page';

describe('MonitorOptionsPage', () => {
  let component: MonitorOptionsPage;
  let fixture: ComponentFixture<MonitorOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitorOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
