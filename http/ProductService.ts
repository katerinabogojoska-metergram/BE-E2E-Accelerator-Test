import { BaseClient } from "./BaseClient";
import {GetAllProductsResponse, ProductModel} from "../model/get/GetProductResponseBody";
import { ResponseEntity } from "express";
import {DeleteProductResponseBody} from "../model/delete/DeleteProductResponseBody";
import {PatchProductRequestBody} from "../model/patch/PatchProductRequestBody";
import {PatchProductRequestBodyInvalid} from "../model/patch/PatchProductRequestBodyInvalid";
import {PostProductModelImpl} from "../model/post/PostProductRequestBodyImpl";
import {PostProductModelInvalid} from "../model/post/PostProductRequestBodyInvalidImpl";
import {PutProductModelImpl} from "../model/put/PutProductRequestBodyImpl";
import {PutProductModelInvalid} from "../model/put/PutProductRequestBodyInvalid";


export class ProductService {
    get categories(): string[] {
        return this._categories;
    }
    private readonly client: BaseClient;
    private _categories: string[];

    constructor(_client: BaseClient) {
        this.client = _client;
    }

    async init(){
        let response = await this.getCategories();
        this._categories=response.data
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

    public getProductByCategoryNumber(category: number): ResponseEntity<GetAllProductsResponse> {
        return this.client.get("products/category/" + category);
    }

    public postProduct(payload?: PostProductModelImpl, payloadInvalid?: PostProductModelInvalid): ResponseEntity<ProductModel> {
        if(payload) {
            return this.client.post("products/add", payload)
        } else if (payloadInvalid) {
            return this.client.post("products/add", payloadInvalid)
        } else {
            console.error("Payloads cannot both be null")
        }
    }

    public patchProduct(id: number, payload?: PatchProductRequestBody, payloadInvalid?: PatchProductRequestBodyInvalid): ResponseEntity<ProductModel> {
        if(payload) {
            return this.client.patch("products/" + id, payload);
        } else if (payloadInvalid) {
            return this.client.patch("products/" + id, payloadInvalid);
        } else {
            console.error("Payloads cannot both be null")
        }
    }

    public putProduct(id: number, payload?: PutProductModelImpl, payloadInvalid?: PutProductModelInvalid): ResponseEntity<ProductModel> {
        if(payload) {
            return this.client.put("products/" + id, payload);
        } else if (payloadInvalid) {
            return this.client.patch("products/" + id, payloadInvalid);
        } else {
            console.error("Payloads cannot both be null")
        }
    }

    public deleteProduct(id: number): ResponseEntity<DeleteProductResponseBody> {
        return this.client.delete(("products/" + id));
    }

    public async getCategories(): ResponseEntity<string[]> {
        return await this.client.get("products/category-list");
    }
}