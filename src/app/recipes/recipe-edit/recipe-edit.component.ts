import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  inEditMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.getIdFromRouteAndListenForChanges();
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.inEditMode) {
      this.recipeService.updateRecipe(newRecipe);
    } else {
      newRecipe.id = Math.floor(Math.random() * 100);
      this.recipeService.addRecipe(newRecipe);
    }
    this.navigateUpOneLevel();
  }
  
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
      ); // Getting the 'ingredients' control, explicitly cast as a FormArray
    }
  
    onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
    
    removeAllIngredients() {
      (<FormArray>this.recipeForm.get('ingredients')).clear();
    }
    private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.inEditMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }    
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  private getIdFromRouteAndListenForChanges() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.inEditMode = params['id'] != null;
        this.initForm();
      });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
    // *ngFor="let ingredientCtrl of getControls(); let i = index"
  }

  navigateUpOneLevel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
