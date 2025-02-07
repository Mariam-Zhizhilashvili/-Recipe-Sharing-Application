import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe; // Holds the recipe details

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    this.recipeService.getRecipes().subscribe((recipes) => {
      const foundRecipe = recipes.find(r => r.id.toString() === id);
      if (foundRecipe) {
        this.recipe = foundRecipe; 
      } else {
        this.recipeService.getRecipeById(Number(id)).subscribe((recipe) => {
          this.recipe = recipe;
        });
      }
    });
  }
}
