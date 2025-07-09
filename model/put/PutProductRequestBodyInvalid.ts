import {PutDimensions, PutMeta, PutProductModel, PutReview} from "./PutProductRequestBody";

export class PutDimensionsInvalid implements PutDimensions<string> {
    constructor(
        public width: string,
        public height: string,
        public depth: string
    ) {}
}

export class PutReviewInvalid implements PutReview<number,string> {
    constructor(
        public rating: string,
        public comment: number,
        public date: number, // ISO date number
        public reviewerName: number,
        public reviewerEmail: number
    ) {}
}

export class PutMetaInvalid implements PutMeta {
    constructor(
        public createdAt: string,  // ISO date string
        public updatedAt: string,  // ISO date string
        public barcode: string,
        public qrCode: string
    ) {}
}

export class PutProductModelInvalid implements PutProductModel<number,string> {
    constructor(
        public title: number,
        public description: number,
        public category: number,
        public price: string,
        public discountPercentage: string,
        public rating: string,
        public stock: string,
        public tags: number[],
        public brand: number,
        public sku: number,
        public weight: string,
        public dimensions: PutDimensionsInvalid,
        public warrantyInformation: number,
        public shippingInformation: number,
        public availabilityStatus: number,
        public reviews: PutReviewInvalid[],
        public returnPolicy: number,
        public minimumOrderQuantity: string,
        public meta: PutMetaInvalid,
        public thumbnail: number,
        public images: number[]
    ) {}


}
