import { PostProductModel, PostDimensions, PostReview, PostMeta } from "../model/post/PostProductRequestBodyImpl";
import {PutProductModelImpl} from "../model/put/PutProductRequestBodyImpl";
import {PatchProductRequestBody} from "../model/patch/PatchProductRequestBody";

export class ProductPredefinedPayloads {
    static postProduct = new PostProductModel(
        "Essence Mascara Lash Princess",
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        "beauty",
        9.99,
        7.17,
        4.94,
        5,
        ["beauty", "mascara"],
        "Essence",
        "RCH45Q1A",
        2,
        new PostDimensions(23.17, 14.43, 28.01),
        "1 month warranty",
        "Ships in 1 month",
        "Low Stock",
        [
            new PostReview(
                2,
                "Very unhappy with my purchase!",
                "2024-05-23T08:56:21.618Z",
                "John Doe",
                "john.doe@x.dummyjson.com"
            ),
            new PostReview(
                2,
                "Not as described!",
                "2024-05-23T08:56:21.618Z",
                "Nolan Gonzalez",
                "nolan.gonzalez@x.dummyjson.com"
            ),
            new PostReview(
                5,
                "Very satisfied!",
                "2024-05-23T08:56:21.618Z",
                "Scarlett Wright",
                "scarlett.wright@x.dummyjson.com"
            )
        ],
        "30 days return policy",
        24,
        new PostMeta(
            "2024-05-23T08:56:21.618Z",
            "2024-05-23T08:56:21.618Z",
            "9164035109868",
            "..."
        ),
        "...", // thumbnail
        ["...", "...", "..."]
    );

    static putProduct = new PutProductModelImpl(
        "Updated Essence Mascara Lash Princess", // updated title
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        "beauty",
        9.99,
        7.17,
        4.94,
        5,
        ["beauty", "mascara"],
        "Essence",
        "RCH45Q1A",
        2,
        new PostDimensions(23.17, 14.43, 28.01),
        "1 month warranty",
        "Ships in 1 month",
        "Low Stock",
        [
            new PostReview(
                2,
                "Very unhappy with my purchase!",
                "2024-05-23T08:56:21.618Z",
                "John Doe",
                "john.doe@x.dummyjson.com"
            ),
            new PostReview(
                2,
                "Not as described!",
                "2024-05-23T08:56:21.618Z",
                "Nolan Gonzalez",
                "nolan.gonzalez@x.dummyjson.com"
            ),
            new PostReview(
                5,
                "Very satisfied!",
                "2024-05-23T08:56:21.618Z",
                "Scarlett Wright",
                "scarlett.wright@x.dummyjson.com"
            )
        ],
        "30 days return policy",
        24,
        new PostMeta(
            "2024-05-23T08:56:21.618Z",
            "2024-05-23T08:56:21.618Z",
            "9164035109868",
            "..."
        ),
        "...",
        ["...", "...", "..."]
    );

    static patchProduct: PatchProductRequestBody = {
        price: 8.49,
        discountPercentage: 10,
        stock: 15,
        rating: 4.8,
    };
}

// reviews: [
//             new PostReview(
//                 4,
//                 "Good overall.",
//                 "2024-07-07T12:00:00.000Z",
//                 "New Reviewer",
//                 "new.reviewer@x.dummyjson.com"
//             )
//         ],
//         meta: new PostMeta(
//             "2024-05-23T08:56:21.618Z",
//             "2024-05-23T08:58:21.618Z",
//             "9164035109868",
//             "updated-qr-code"
//         )
