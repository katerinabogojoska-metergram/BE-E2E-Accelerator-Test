import * as PostIntrfc from "../post/PostProductRequestBody"

export class PostDimensionsImpl implements PostIntrfc.PostDimensions<number> {
    constructor(
        public width: number,
        public height: number,
        public depth: number
    ) {}
}

export class PostReviewImpl implements PostIntrfc.PostReview<string,number>{
    constructor(
        public rating: number,
        public comment: string,
        public date: string, // ISO date string
        public reviewerName: string,
        public reviewerEmail: string
    ) {}
}

export class PostMetaImpl implements PostIntrfc.PostMeta{
    constructor(
        public createdAt: string,  // ISO date string
        public updatedAt: string,  // ISO date string
        public barcode: string,
        public qrCode: string
    ) {}
}

export class PostProductModelImpl implements PostIntrfc.PostProductModel<string,number> {
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
        public dimensions: PostDimensionsImpl,
        public warrantyInformation: string,
        public shippingInformation: string,
        public availabilityStatus: string,
        public reviews: PostReviewImpl[],
        public returnPolicy: string,
        public minimumOrderQuantity: number,
        public meta: PostMetaImpl,
        public thumbnail: string,
        public images: string[]
    ) {}
}
