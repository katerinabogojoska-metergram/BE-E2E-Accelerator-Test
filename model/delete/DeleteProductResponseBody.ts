import {ProductModel} from "../get/GetProductResponseBody";

export interface DeleteProductResponseBody extends ProductModel {
    id: number;
    isDeleted: boolean;
    deletedOn: string; // ISO date string
}