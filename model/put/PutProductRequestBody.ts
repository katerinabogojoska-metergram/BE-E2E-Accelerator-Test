import * as PostReq from "../post/PostProductRequestBody";

export interface PutProductModel<Type1,Type2> extends PostReq.PostProductModel<Type1,Type2>{
}

export interface PutDimensions<Type2> extends PostReq.PostDimensions<Type2>{}

export interface PutReview<Type1,Type2> extends PostReq.PostReview<Type1,Type2>{}

export interface PutMeta extends PostReq.PostMeta{}