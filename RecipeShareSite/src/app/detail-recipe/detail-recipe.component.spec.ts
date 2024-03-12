import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecipeComponent } from './detail-recipe.component';

describe('DetailRecipeComponent', () => {
  let component: DetailRecipeComponent;
  let fixture: ComponentFixture<DetailRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRecipeComponent]
    });
    fixture = TestBed.createComponent(DetailRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
