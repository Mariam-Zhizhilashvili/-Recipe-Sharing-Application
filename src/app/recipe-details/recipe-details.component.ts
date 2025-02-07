import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipe!: Recipe; 
  private destroy$ = new Subject<void>(); 

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    this.recipeService.getRecipes()
      .pipe(takeUntil(this.destroy$))  
      .subscribe((recipes) => {
        const foundRecipe = recipes.find(r => r.id.toString() === id);
        if (foundRecipe) {
          this.recipe = foundRecipe; 
        } else {
          this.recipeService.getRecipeById(Number(id))
            .pipe(takeUntil(this.destroy$))  
            .subscribe((recipe) => {
              this.recipe = recipe;
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}
