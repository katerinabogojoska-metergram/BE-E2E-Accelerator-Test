import { BaseClient } from "./BaseClient";
import {GetAllProductsResponse, ProductModel} from "../model/get/GetProductResponseBody";
import { ResponseEntity } from "express";
import {Recipe, RecipeResponse} from "../model/get/GetRecipeResponseBody";
// import {RecipePredefinedPayloads} from "../payloads/RecipePredefinedPayloads";
// import {DeleteRecipeResponse} from "../model/delete/DeleteRecipeResponseBody";
import {ProductPredefinedPayloads} from "../payloads/ProductPredefinedPayloads";
import {DeleteProductResponseBody} from "../model/delete/DeleteProductResponseBody";
import {PostProductModel} from "../model/post/PostProductRequestBody";
import {PatchProductRequestBody} from "../model/patch/PatchProductRequestBody";
// import {GetAllCategoriesResponse} from "../model/get/GetProductCategoriesResponseBody";


export class ProductService {
    get categories(): string[] {
        return this._categories;
    }
    private readonly client: BaseClient;
    private _categories: string[];

    constructor(_client: BaseClient) {
        this.client = _client;
        this._categories = this.getCategories();
    }

    public getProducts(): ResponseEntity<GetAllProductsResponse> {
        return this.client.get("products");
    }
    /**
     * Fetches user details by user ID.
     * @param {number} id - The ID of the user to fetch.
     * @returns {ResponseEntity<GetUserResponseBody>} The response entity containing the user details.
     */
    public getProductById(id: number): ResponseEntity<ProductModel> {
        return this.client.get("products/" + id);
    }

    public getProductsWithLimit(limit: number, skip: number, title: string): ResponseEntity<GetAllProductsResponse> {
        return this.client.get(`products?limit=${limit}&skip=${skip}&select=${title}`);
    }

    public getProductByCategory(category: string): ResponseEntity<GetAllProductsResponse> {
        return this.client.get("products/category/" + category);
    }

    public postProduct(payload: PostProductModel): ResponseEntity<ProductModel> {
        return this.client.post("products/add", payload)
    }

    public patchProduct(id: number, payload: PatchProductRequestBody): ResponseEntity<RecipeResponse> {
        return this.client.patch("products/" + id, ProductPredefinedPayloads.patchProduct);
    }

    public putProduct(id: number, payload: PostProductModel): ResponseEntity<RecipeResponse> {
        return this.client.put("products/" + id, ProductPredefinedPayloads.putProduct);
    }

    public deleteProduct(id: number): ResponseEntity<DeleteProductResponseBody> {
        return this.client.delete(("products/" + id));
    }

    public getCategories(): ResponseEntity<string[]> {
        return this.client.get("products/category-list");
    }
}