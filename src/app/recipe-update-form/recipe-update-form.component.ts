import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-update-form',
  templateUrl: './recipe-update-form.component.html',
  styleUrls: ['./recipe-update-form.component.css']
})
export class RecipeUpdateFormComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup;
  recipeId!: string | number; 
  private destroy$ = new Subject<void>(); 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') ?? '';

    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      ingredients: this.fb.array([]),
      cookingInstructions: ['', Validators.required],
    });

    this.recipeService.getRecipes()
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((recipes) => {
        const recipe = recipes.find(r => r.id.toString() === this.recipeId.toString());
        if (!recipe) return;

        this.recipeForm.patchValue({
          title: recipe.title,
          description: recipe.description,
          thumbnail: recipe.thumbnail,
          cookingInstructions: recipe.cookingInstructions,
        });

        const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
        ingredientsArray.clear();
        if (Array.isArray(recipe.ingredients)) {
          recipe.ingredients.forEach(ingredient => {
            ingredientsArray.push(new FormControl(ingredient, Validators.required));
          });
        }
      });
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onUpdate(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipe = {
        id: this.recipeId, 
        ...this.recipeForm.value,
        ingredients: Array.isArray(this.recipeForm.value.ingredients)
          ? this.recipeForm.value.ingredients
          : this.recipeForm.value.ingredients.split(',').map((ing: string) => ing.trim()),
      };

      this.recipeService.editRecipe(this.recipeId, updatedRecipe)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe(() => {
          this.router.navigate(['/']); 
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
