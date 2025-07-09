export interface PostProductModel<Type1,Type2> {
    title: Type1;
    description: Type1;
    category: Type1;
    price: Type2;
    discountPercentage: Type2;
    rating: Type2;
    stock: Type2;
    tags: Type1[];
    brand: Type1;
    sku: Type1;
    weight: Type2;
    dimensions: PostDimensions<Type2>;
    warrantyInformation: Type1;
    shippingInformation: Type1;
    availabilityStatus: Type1;
    reviews: PostReview<Type1,Type2>[];
    returnPolicy: Type1;
    minimumOrderQuantity: Type2;
    meta: PostMeta;
    thumbnail: Type1;
    images: Type1[];
}

export interface PostDimensions<Type2> {
    width: Type2;
    height: Type2;
    depth: Type2;
}

export interface PostReview<Type1,Type2> {
    rating: Type2;
    comment: Type1;
    date: Type1; // ISO date Type1
    reviewerName: Type1;
    reviewerEmail: Type1;
}

export interface PostMeta {
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    barcode: string;
    qrCode: string;
}