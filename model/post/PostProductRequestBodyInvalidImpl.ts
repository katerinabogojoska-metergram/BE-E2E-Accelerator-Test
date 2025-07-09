import * as PostIntrfc from "../post/PostProductRequestBody"

export class PostDimensionsInvalid implements PostIntrfc.PostDimensions<string> {
    constructor(
        public width: string,
        public height: string,
        public depth: string
    ) {}
}

export class PostReviewInvalid implements PostIntrfc.PostReview<number,string>{
    constructor(
        public rating: string,
        public comment: number,
        public date: number, // ISO date string
        public reviewerName: number,
        public reviewerEmail: number
    ) {}
}

export class PostMetaInvalid implements PostIntrfc.PostMeta{
    constructor(
        public createdAt: string,  // ISO date string
        public updatedAt: string,  // ISO date string
        public barcode: string,
        public qrCode: string
    ) {}
}

export class PostProductModelInvalid implements PostIntrfc.PostProductModel<number,string> {
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
        public dimensions: PostDimensionsInvalid,
        public warrantyInformation: number,
        public shippingInformation: number,
        public availabilityStatus: number,
        public reviews: PostReviewInvalid[],
        public returnPolicy: number,
        public minimumOrderQuantity: string,
        public meta: PostMetaInvalid,
        public thumbnail: number,
        public images: number[]
    ) {}
}
