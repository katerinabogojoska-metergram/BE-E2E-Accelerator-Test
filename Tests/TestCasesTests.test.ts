import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {ProductPredefinedPayloads} from "../payloads/ProductPredefinedPayloads";
import {response} from "express";
import {UserPredefinedPayloads} from "../payloads/UserPredefinedPayloads";

describe('TestCases', () => {
    let metergramClient: MetergramClient;
    let idForProduct: number = 1;
    let nonExistingProductId: number = 100000000000000;

    function expectingForError(statusCode: number, responseEntity: any, message?:string){
        expect(responseEntity.status).toEqual(statusCode);
        expect(responseEntity.data.products).toBeUndefined();
        expect(responseEntity.data.total).toBeUndefined();
        expect(responseEntity.data.skip).toBeUndefined();
        expect(responseEntity.data.limit).toBeUndefined();
        expect(responseEntity.data.errorMessage).toBeDefined();
        if(message)
            expect(responseEntity.data.errorMessage).toEqual(message);
    }

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

    test('GetNonExistingProduct', async () => {
        const responseEntity = await metergramClient.productService.getProductById(nonExistingProductId)
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });

    test('GetProductWithNegativeId', async () => {
        const responseEntity = await metergramClient.productService.getProductById(-10)
        expectingForError(404, responseEntity, "Product id must be greater or equal to 0");
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
        expect(responseEntity.data.skip).toBeDefined();
        expect(responseEntity.data.limit).toBeDefined();
    });

    test('GetLimitedProductNumberInvalidParams', async () => {
        const responseEntity = await metergramClient.productService.getProductsWithLimit(100000000000000,100000000000000,"non-existing")
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });


    test('CreateAProduct', async () => {
        let objData = ProductPredefinedPayloads.postProduct;
        const responseEntity = await metergramClient.productService.postProduct(ProductPredefinedPayloads.postProduct)
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

    // test('EditAProductPut', async () => {
    //     let objData = ProductPredefinedPayloads.putProduct;
    //     const responseEntity = await metergramClient.productService.putProduct(idForProduct, ProductPredefinedPayloads.putProduct)
    //     expect(responseEntity.status).toEqual(200);
    //     expect(responseEntity.data.id).toBeDefined();
    //     expect(responseEntity.data).toMatchObject({
    //         title: objData.title,
    //         price: objData.price,
    //         discountPercentage: objData.discountPercentage,
    //         stock: objData.stock,
    //         rating: objData.rating,
    //         images: objData.images.map(r => r),
    //         thumbnail: objData.thumbnail,
    //         description: objData.description,
    //         brand: objData.brand,
    //         category: objData.category
    //     });
    // });
    //
    // test('EditAProductPatch', async () => {
    //     let objData = ProductPredefinedPayloads.patchProduct;
    //     const responseEntity = await metergramClient.productService.patchProduct(idForProduct, ProductPredefinedPayloads.patchProduct)
    //     expect(responseEntity.status).toEqual(200);
    //     expect(responseEntity.data.id).toBeDefined();
    //     expect(responseEntity.data).toMatchObject({
    //         price: objData.price,
    //         discountPercentage: objData.discountPercentage,
    //         stock: objData.stock,
    //         rating: objData.rating
    //     });
    // });

    test('DeleteAProduct', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(idForProduct)
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.id).toBeDefined();
        expect(responseEntity.data.deletedOn).toBeDefined();
        expect(responseEntity.data.isDeleted).toBeDefined();
    });

    test('DeleteAProductWithLongId/NonexistingProduct', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(nonExistingProductId)
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });

    test('DeleteAProductWithNegativeId', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(-10)
        expectingForError(404, responseEntity, "Product id must be greater or equal to 0");
    });

    test('GetProductsByCategory', async () => {
        const responseEntity = await metergramClient.productService.getProductByCategory(metergramClient.productService.categories[0])
        expect(responseEntity.status).toEqual(200);
        expect(responseEntity.data.products.length).toBeGreaterThanOrEqual(0);
    });

    // getProductByCategory vrakja GetAllProductsResponse a sakame pri error (bi trebalo da ima error vo sluchajov)
    // da vrakja neshto od tipot {message: "..."} zatoa dodadov errorMessage optional field
    test('GetProductsByNonExistingCategory', async () => {
        const responseEntity = await metergramClient.productService.getProductByCategory("some-non-existing-category");
        expectingForError(404, responseEntity);
    });

    test('GetProductsByImpossibleCategory', async () => {
        const responseEntity = await metergramClient.productService.getProductByCategory("$#@HbguUFhbfh&&^$&@");
        expectingForError(404, responseEntity);
    });


    test('GetAllRecipes', async () => {
        const id = 9
        const responseEntity = await metergramClient.recipeService.getRecipes()
        expect(responseEntity.status).toEqual(200)
        expect(responseEntity.data.recipes[id].id).toEqual(id + 1)
    });

    // test('CreateAUser', async () => {
    //     const responseEntity = await metergramClient.userService.postUser(UserPredefinedPayloads.postUser);
    //     expect(responseEntity.status).toEqual(201);
    //     expect(responseEntity.data).toMatchObject({firstName: "emilia", lastName: "clarke", age: 38});
    // });

});
