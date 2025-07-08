import { BaseClient } from "./BaseClient";
import { RecipeResponse, Recipe } from "../model/get/GetRecipeResponseBody";
import { ResponseEntity } from "express";
import {DeleteRecipeResponse} from "../model/delete/DeleteRecipeResponseBody";
import {RecipePredefinedPayloads} from "../payloads/RecipePredefinedPayloads";

export class RecipeService {

    private readonly client: BaseClient;

    constructor(_client: BaseClient) {
        this.client = _client;
    }

    public getRecipes(): ResponseEntity<RecipeResponse> {
        return this.client.get("recipes");
    }

    public getRecipeById(id: number): ResponseEntity<Recipe> {
        return this.client.get("recipes/" + id);
    }

    public getRecipesWithLimit(limit: number, skip: number, title: string): ResponseEntity<RecipeResponse> {
        return this.client.get(`recipes?limit=${limit}&skip=${skip}&select=${title}`);
    }

    public postRecipe(): ResponseEntity<Recipe> {
        return this.client.post("recipes", RecipePredefinedPayloads.postRecipe)
    }

    public patchRecipe(id: number): ResponseEntity<RecipeResponse> {
        return this.client.patch("recipes/" + id, RecipePredefinedPayloads.patchRecipe);
    }

    public putRecipe(): ResponseEntity<RecipeResponse> {
        return this.client.put("recipes", RecipePredefinedPayloads.putRecipe);
    }

    public deleteRecipe(id: number): ResponseEntity<DeleteRecipeResponse> {
        return this.client.delete(("recipes/" + id));
    }
}