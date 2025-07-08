import {PostRecipeRequestBody} from "./PostRecipeRequestBody";

export class PostRecipeRequestBodyImpl implements PostRecipeRequestBody {
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: "Easy" | "Medium" | "Hard";
    cuisine: string;
    caloriesPerServing: number;
    tags?: string[];
    userId: number;
    image?: string;
    rating?: number;
    reviewCount?: number;
    mealType?: string[];


    constructor(name: string, ingredients: string[], instructions: string[], prepTimeMinutes: number, cookTimeMinutes: number, servings: number, difficulty: "Easy" | "Medium" | "Hard", cuisine: string, caloriesPerServing: number, tags: string[], userId: number, image: string, rating: number, reviewCount: number, mealType: string[]) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.prepTimeMinutes = prepTimeMinutes;
        this.cookTimeMinutes = cookTimeMinutes;
        this.servings = servings;
        this.difficulty = difficulty;
        this.cuisine = cuisine;
        this.caloriesPerServing = caloriesPerServing;
        this.tags = tags;
        this.userId = userId;
        this.image = image;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.mealType = mealType;
    }
}