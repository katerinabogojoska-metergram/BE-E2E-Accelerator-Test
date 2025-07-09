import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {ProductPredefinedPayloads} from "../payloads/ProductPredefinedPayloads";
import { responseEntity} from "express";
import {UserPredefinedPayloads} from "../payloads/UserPredefinedPayloads";
import { ProductModel} from "../model/get/GetProductResponseBody";

describe('Valid Test Cases', () => {
    let metergramClient: MetergramClient;
    let idForProduct: number = 1;

    beforeAll(async () => {
        metergramClient = new MetergramClient();
        await metergramClient.authClient.init();
    });


    test('GetProduct1', async () => {
        const responseEntity = await metergramClient.productService.getProductById(idForProduct)
        expect(responseEntity.status).toEqual(200)
        expect(responseEntity.data.id).toEqual(idForProduct)
        expect(responseEntity.data.tags[1]).toEqual("mascara")
    });

    test('GetAllProducts', async () => {
        const responseEntity = await metergramClient.productService.getProducts();
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.products.length).toBeGreaterThanOrEqual(0);
    });

    test('GetLimitedProductNumber', async () => {
        const responseEntity = await metergramClient.productService.getProductsWithLimit(10,10,"title")
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.total).toBeDefined();
        expect(typeof responseEntity.data.total).toBe('number');
        expect(responseEntity.data.skip).toBeDefined();
        expect(typeof responseEntity.data.skip).toBe('number');
        expect(responseEntity.data.limit).toBeDefined();
        expect(typeof responseEntity.data.limit).toBe('number');
        let productsFromResponse: ProductModel[] = responseEntity.data.products;
        expect(productsFromResponse.length).toEqual(10);
        for(let product in productsFromResponse) {
            let current = productsFromResponse[product];
            expect(current.id).toBeDefined();
            expect(current.id).toBeGreaterThanOrEqual(0);
            expect(typeof current.id).toBe('number');
            expect(current.title).toBeDefined();
            expect(typeof current.title).toBe('string');
            const keys = Object.keys(current);
            expect(keys).toEqual(['id', 'title']);
        }
    });

    test('GetProductsByCategory', async () => {
        const responseEntity = await metergramClient.productService.getProductByCategory(metergramClient.productService.categories[0])
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.products.length).toBeGreaterThanOrEqual(0);
    });

    test('CreateAProduct', async () => {
        let objData = ProductPredefinedPayloads.postProduct;
        const responseEntity = await metergramClient.productService.postProduct(objData)
        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.data.id).toBeDefined();
        expect(responseEntity.data).toMatchObject({
            title: objData.title,
            price: objData.price,
            discountPercentage: objData.discountPercentage,
            stock: objData.stock,
            rating: objData.rating,
            images: objData.images.map(r => r),
            thumbnail: objData.thumbnail,
            description: objData.description,
            brand: objData.brand,
            category: objData.category
        });
    });

    test('EditAProductPut', async () => {
        let objData = ProductPredefinedPayloads.putProduct;
        const responseEntity = await metergramClient.productService.putProduct(idForProduct, objData)
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toBeDefined();
        expect(responseEntity.data).toMatchObject({
            title: objData.title,
            price: objData.price,
            discountPercentage: objData.discountPercentage,
            stock: objData.stock,
            rating: objData.rating,
            images: objData.images.map(r => r),
            thumbnail: objData.thumbnail,
            description: objData.description,
            brand: objData.brand,
            category: objData.category
        });
    });

    test('EditAProductPatch', async () => {
        let objData = ProductPredefinedPayloads.patchProduct;
        const responseEntity = await metergramClient.productService.patchProduct(idForProduct, objData)
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toBeDefined();
        expect(responseEntity.data).toMatchObject({
            price: objData.price,
            discountPercentage: objData.discountPercentage,
            stock: objData.stock,
            rating: objData.rating
        });
    });

    test('DeleteAProduct', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(idForProduct)
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toBeDefined();
        expect(responseEntity.data.deletedOn).toBeDefined();
        expect(responseEntity.data.isDeleted).toBeDefined();
    });

    test('CreateAUser', async () => {
        const responseEntity = await metergramClient.userService.postUser(UserPredefinedPayloads.postUser);
        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.data).toMatchObject({firstName: "emilia", lastName: "clarke", age: 38});
    });

});
