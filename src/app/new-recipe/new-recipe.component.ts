import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model'; 
@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  recipeForm!: FormGroup;  // Initialize form group
  recipes: Recipe[] = []; // Define recipes array to store fetched recipes

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.initializeForm(); 
    this.loadRecipes(); 
  }

  // Initialize form with necessary controls
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
    this.recipeService.getRecipes().subscribe((recipes) => {
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
    
      this.recipeService.addRecipe(newRecipe).subscribe((savedRecipe) => {
        // console.log('New Recipe Added:', savedRecipe); 
        this.router.navigate(['/']); 
      });
    }
  }
  
}
