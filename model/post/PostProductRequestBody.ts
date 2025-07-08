export interface PostProductModel {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: PostDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: PostReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: PostMeta;
    thumbnail: string;
    images: string[];
}

export interface PostDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface PostReview {
    rating: number;
    comment: string;
    date: string; // ISO date string
    reviewerName: string;
    reviewerEmail: string;
}

export interface PostMeta {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
}