import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import {ProductPredefinedPayloads} from "../payloads/ProductPredefinedPayloads";
import { responseEntity} from "express";
import {UserPredefinedPayloads} from "../payloads/UserPredefinedPayloads";
import { ProductModel} from "../model/get/GetProductResponseBody";
import '../model/put/PutProductRequestBodyImpl';
import '../model/post/PostProductRequestBodyImpl';
import {sharedTests} from "./SharedTests";

describe('Invalid Test Cases', () => {
    let metergramClient: MetergramClient;
    let idForProduct: number = 1;
    let nonExistingProductId: number = 100000000000000;

    function expectingForError(statusCode: number, responseEntity: any, message?:string){
        expect(responseEntity.status).toEqual(statusCode);
        expect(responseEntity.data.products).toBeUndefined();
        expect(responseEntity.data.total).toBeUndefined();
        expect(responseEntity.data.skip).toBeUndefined();
        expect(responseEntity.data.limit).toBeUndefined();
        expect(responseEntity.data.message).toBeDefined();
        if(message)
            expect(responseEntity.data.message).toEqual(message);
    }

    beforeAll(async () => {
        metergramClient = new MetergramClient();
        await metergramClient.authClient.init();
        await metergramClient.productService.init();
    });

    test('CheckTokenValidity', async () => {
        sharedTests(metergramClient.authClient.token);
    })

    test('GetNonExistingProduct', async () => {
        const responseEntity = await metergramClient.productService.getProductById(nonExistingProductId)
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });

    test('GetProductWithNegativeId', async () => {
        const responseEntity = await metergramClient.productService.getProductById(-10)
        expectingForError(400, responseEntity, "Product id must be greater or equal to 0");
    });

    test('GetLimitedProductNumberInvalidParams', async () => {
        const responseEntity = await metergramClient.productService.getProductsWithLimit(100000000000000,100000000000000,"non-existing")
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });

    test('CreateAProductWithInvalidFields', async () => {
        let objData = ProductPredefinedPayloads.postProductInvalidFields;
        const responseEntity = await metergramClient.productService.postProduct(null, objData)
        expectingForError(400, responseEntity);
        expect(typeof responseEntity.data.price).not.toBe('string')
        expect(typeof responseEntity.data.discountPercentage).not.toBe('string')
        expect(typeof responseEntity.data.stock).not.toBe('string')
    });

    test('CreateAProductDiscountPercentageGreaterThan100', async () => {
        let objData = ProductPredefinedPayloads.postProductDiscountMoreThan100;
        const responseEntity = await metergramClient.productService.postProduct(objData)
        expectingForError(400, responseEntity);
        expect(responseEntity.data.discountPercentage).not.toBe(objData.discountPercentage);
    });

    test('EditAProductPutInvalidFields', async () => {
        let objData = ProductPredefinedPayloads.putProductInvalidFields;
        const responseEntity = await metergramClient.productService.putProduct(idForProduct, null, objData)
        expectingForError(400, responseEntity)
        expect(typeof responseEntity.data.price).not.toBe('string')
        expect(typeof responseEntity.data.discountPercentage).not.toBe('string')
        expect(typeof responseEntity.data.stock).not.toBe('string')
    });

    test('EditAProductPutDiscountPercentageGreaterThan100', async () => {
        let objData = ProductPredefinedPayloads.putProductDiscountMoreThan100;
        const responseEntity = await metergramClient.productService.putProduct(idForProduct, objData)
        expectingForError(400, responseEntity)
        expect(responseEntity.data.discountPercentage).not.toBe(objData.discountPercentage);
    });

    test('EditAProductPatchInvalidFields', async () => {
        let objData = ProductPredefinedPayloads.patchProductInvalidFields;
        const responseEntity = await metergramClient.productService.patchProduct(idForProduct, null, objData)
        expectingForError(400, responseEntity)
        expect(typeof responseEntity.data.price).not.toBe('string')
        expect(typeof responseEntity.data.discountPercentage).not.toBe('string')
        expect(typeof responseEntity.data.stock).not.toBe('string')
    });

    test('EditAProductPatchDiscountPercentageGreaterThan100', async () => {
        let objData = ProductPredefinedPayloads.patchProductDiscountMoreThan100;
        const responseEntity = await metergramClient.productService.patchProduct(idForProduct, objData)
        expectingForError(400, responseEntity)
        expect(responseEntity.data.discountPercentage).not.toBe(objData.discountPercentage);
    });

    test('DeleteAProductWithLongId/NonexistingProduct', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(nonExistingProductId)
        expectingForError(404, responseEntity, "Product with id '100000000000000' not found");
    });

    test('DeleteAProductWithNegativeId', async () => {
        const responseEntity = await metergramClient.productService.deleteProduct(-10)
        expectingForError(400, responseEntity, "Product id must be greater or equal to 0");
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

    test('GetProductsByNumberAsCategory', async () => {
        const responseEntity = await metergramClient.productService.getProductByCategoryNumber(1);
        expectingForError(404, responseEntity);
    });

    test('CreateAUserInvalidFields', async () => {
        let objData = UserPredefinedPayloads.postUserInvalidFields;
        const responseEntity = await metergramClient.userService.postUser(null, objData);
        expectingForError(400, responseEntity);
    });

    test('CreateAUserInvalidAge', async () => {
        let objData = UserPredefinedPayloads.postUserImpossibleAge;
        const responseEntity = await metergramClient.userService.postUser(objData);
        expect(responseEntity.data.age).not.toEqual(objData.age);
        expectingForError(400, responseEntity);
    });

});
