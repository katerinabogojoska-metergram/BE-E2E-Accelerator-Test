import * as PostIntrfc from "../post/PostProductRequestBody"

export class PostDimensions implements PostIntrfc.PostDimensions {
    constructor(
        public width: number,
        public height: number,
        public depth: number
    ) {}
}

export class PostReview implements PostIntrfc.PostReview{
    constructor(
        public rating: number,
        public comment: string,
        public date: string, // ISO date string
        public reviewerName: string,
        public reviewerEmail: string
    ) {}
}

export class PostMeta implements PostIntrfc.PostMeta{
    constructor(
        public createdAt: string,  // ISO date string
        public updatedAt: string,  // ISO date string
        public barcode: string,
        public qrCode: string
    ) {}
}

export class PostProductModel implements PostIntrfc.PostProductModel {
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
        public dimensions: PostDimensions,
        public warrantyInformation: string,
        public shippingInformation: string,
        public availabilityStatus: string,
        public reviews: PostReview[],
        public returnPolicy: string,
        public minimumOrderQuantity: number,
        public meta: PostMeta,
        public thumbnail: string,
        public images: string[]
    ) {}
}
