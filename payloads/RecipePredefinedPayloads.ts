import {PatchRecipeRequestBody} from "../model/patch/PatchRecipeRequestBody";
import {PostRecipeRequestBody} from "../model/post/PostRecipeRequestBody";
import {PutRecipeRequestBody} from "../model/put/PutRecipeRequestBody";

export class RecipePredefinedPayloads {
    static postRecipe: PostRecipeRequestBody = {
        "name": "Classic Margherita Pizza",
        "ingredients": [
            "Pizza dough",
            "Tomato sauce",
            "Fresh mozzarella cheese",
            "Fresh basil leaves",
            "Olive oil",
            "Salt and pepper to taste"
        ],
        "instructions": [
            "Preheat the oven to 475°F (245°C).",
            "Roll out the pizza dough and spread tomato sauce evenly.",
            "Top with slices of fresh mozzarella and fresh basil leaves.",
            "Drizzle with olive oil and season with salt and pepper.",
            "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
            "Slice and serve hot."
        ],
        "prepTimeMinutes": 20,
        "cookTimeMinutes": 15,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Italian",
        "caloriesPerServing": 300,
        "tags": ["Pizza", "Italian"],
        "userId": 45,
        "image": "https://cdn.dummyjson.com/recipe-images/1.webp",
        "rating": 4.6,
        "reviewCount": 3,
        "mealType": ["Dinner"]
    }

    static patchRecipe: PatchRecipeRequestBody = {
        rating: 4.8,
        reviewCount: 5
    };

    static putRecipe: PutRecipeRequestBody = {
        id: 1,
        ...this.postRecipe,
        name: "Updated Margherita Pizza"
    }

}