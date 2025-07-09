import {PutDimensions, PutMeta, PutProductModel, PutReview} from "./PutProductRequestBody";

export class PutDimensionsImpl implements PutDimensions<number> {
    constructor(
        public width: number,
        public height: number,
        public depth: number
    ) {}
}

export class PutReviewImpl implements PutReview<string,number> {
    constructor(
        public rating: number,
        public comment: string,
        public date: string, // ISO date string
        public reviewerName: string,
        public reviewerEmail: string
    ) {}
}

export class PutMetaImpl implements PutMeta {
    constructor(
        public createdAt: string,  // ISO date string
        public updatedAt: string,  // ISO date string
        public barcode: string,
        public qrCode: string
    ) {}
}

export class PutProductModelImpl implements PutProductModel<string,number> {
    constructor(
        public title: string,
        public description: string,
        public category: string,
        public price: number,
        public discountPercentage: number,
        public rating: number,
        public stock: number,
        public tags: string[],
        public brand: string,
        public sku: string,
        public weight: number,
        public dimensions: PutDimensionsImpl,
        public warrantyInformation: string,
        public shippingInformation: string,
        public availabilityStatus: string,
        public reviews: PutReviewImpl[],
        public returnPolicy: string,
        public minimumOrderQuantity: number,
        public meta: PutMetaImpl,
        public thumbnail: string,
        public images: string[]
    ) {}


}
