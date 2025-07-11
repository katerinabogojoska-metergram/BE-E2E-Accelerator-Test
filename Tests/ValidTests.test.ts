import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {ProductPredefinedPayloads} from "../payloads/ProductPredefinedPayloads";
import { responseEntity} from "express";
import {UserPredefinedPayloads} from "../payloads/UserPredefinedPayloads";
import { ProductModel} from "../model/get/GetProductResponseBody";
import '../model/put/PutProductRequestBodyImpl';
import '../model/post/PostProductRequestBodyImpl';
import {sharedTests} from './SharedTests';

describe('Valid Test Cases', () => {
    let metergramClient: MetergramClient;
    let idForProduct: number = 1;

    beforeAll(async () => {
        metergramClient = new MetergramClient();
        await metergramClient.authClient.init();
        await metergramClient.productService.init();
    });

    function checkProductFields(product: ProductModel) {
        expect(product.id).toBeDefined();
        expect(product.id).toBeGreaterThanOrEqual(0);
        expect(typeof product.id).toBe('number');
        expect(typeof product.reviews).toBe('object')
        expect(Array.isArray(product.reviews)).toBe(true);
        expect(product.reviews.length).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(product.tags)).toBe(true);
        expect(product.tags.length).toBeGreaterThanOrEqual(0);
        if(product.tags.length>0)
            expect(typeof product.tags[0]).toBe('string');
    }

    test('CheckTokenValidity', async () => {
        sharedTests(metergramClient.authClient.token);
    })

    test('GetProduct1', async () => {
        const responseEntity = await metergramClient.productService.getProductById(idForProduct)
        expect(responseEntity.status).toEqual(200)
        expect(responseEntity.data.id).toEqual(idForProduct)
        expect(responseEntity.data.thumbnail).toBeDefined()
        expect(responseEntity.data.tags).toEqual([ 'beauty', 'mascara' ])
        expect(responseEntity.data.meta.createdAt).toEqual('2025-04-30T09:41:02.053Z')
        checkProductFields(responseEntity.data);
    });

    test('GetAllProducts', async () => {
        const responseEntity = await metergramClient.productService.getProducts();
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.products.length).toBeGreaterThanOrEqual(0);
        for(let product in responseEntity.data.products) {
            checkProductFields(responseEntity.data.products[product]);
        }
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
        for(let product in responseEntity.data.products) {
            checkProductFields(responseEntity.data.products[product]);
            expect(responseEntity.data.products[product].category).toEqual(metergramClient.productService.categories[0]);
        }
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
        expect(responseEntity.data.id).toEqual(idForProduct);
        checkProductFields(responseEntity.data);
        expect(responseEntity.data.deletedOn).toBeDefined();
        expect(responseEntity.data.isDeleted).toBeDefined();
    });

    test('CreateAUser', async () => {
        let objData = UserPredefinedPayloads.postUser;
        const responseEntity = await metergramClient.userService.postUser(objData);
        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.data.id).toBeDefined()
        expect(typeof responseEntity.data.id).toBe('number')
        expect(responseEntity.data).toMatchObject({firstName: "emilia", lastName: "clarke", age: 38});
    });

});
