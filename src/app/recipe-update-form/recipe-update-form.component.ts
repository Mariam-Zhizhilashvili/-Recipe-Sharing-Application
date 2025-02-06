import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-update-form',
  templateUrl: './recipe-update-form.component.html',
  styleUrls: ['./recipe-update-form.component.css']
})
export class RecipeUpdateFormComponent implements OnInit {
  recipeForm!: FormGroup;
  recipeId!: string | number; 


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const recipeIdParam = this.route.snapshot.paramMap.get('id');
  
    if (!recipeIdParam) {
      // console.error('No Recipe ID found in URL');
      // alert('Invalid Recipe ID');
      return;
    }
  
    // Ensures that recipeId is always a string
    this.recipeId = recipeIdParam.toString(); 
  
    // console.log('Editing Recipe ID:', this.recipeId);
  
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      ingredients: this.fb.array([]),
      cookingInstructions: ['', Validators.required],
    });
  
    this.recipeService.getRecipes().subscribe((recipes) => {
      // console.log("All Recipes:", recipes.map(r => r.id)); 
      // console.log("Looking for Recipe ID:", this.recipeId);
    
      const recipe = recipes.find(r => r.id.toString() === this.recipeId.toString());
    
      if (!recipe) {
        // console.warn('⚠️ Recipe ID not found:', this.recipeId);
        return; 
      }
    
      // console.log('✅ Found Recipe:', recipe);
    
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
      } else {
        // console.error('Error: ingredients is not an array', recipe.ingredients);
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
      const updatedRecipe = {
        id: this.recipeId, 
        ...this.recipeForm.value,
        ingredients: Array.isArray(this.recipeForm.value.ingredients)
          ? this.recipeForm.value.ingredients
          : this.recipeForm.value.ingredients.split(',').map((ing: string) => ing.trim()),
      };
  
      // console.log("Updating Recipe:", updatedRecipe);
  
      this.recipeService.editRecipe(this.recipeId, updatedRecipe).subscribe(
        () => {
          // console.log("Recipe updated successfully!");
          // alert('Recipe updated successfully!');
          this.router.navigate(['/']); 
        },
        (error) => {
          // console.error("Error updating recipe:", error);
          // alert("Failed to update recipe. Check console for details.");
        }
      );
    } else {
      // alert('Please fill all fields correctly');
    }
  }
  
}
