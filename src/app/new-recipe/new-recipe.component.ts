import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit, OnDestroy {
  recipeForm!: FormGroup; 
  recipes: Recipe[] = [];
  private destroy$ = new Subject<void>(); 

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.initializeForm(); 
    this.loadRecipes(); 
  }

  initializeForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]), 
      cookingInstructions: ['', Validators.required]
    });
  }

  loadRecipes(): void {
    this.recipeService.getRecipes()
      .pipe(takeUntil(this.destroy$))  
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray);
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = this.recipeForm.value;
    
      this.recipeService.addRecipe(newRecipe)
        .pipe(takeUntil(this.destroy$))  
        .subscribe((savedRecipe) => {
          this.router.navigate(['/']); 
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();  
    this.destroy$.complete();  
  }
}

