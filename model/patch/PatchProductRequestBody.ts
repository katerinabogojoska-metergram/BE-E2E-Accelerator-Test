import {PostProductModel} from "../post/PostProductRequestBody";

export type PatchProductRequestBody = Partial<PostProductModel<string,number>>;