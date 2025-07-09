import {
    PostProductModelImpl,
    PostDimensionsImpl,
    PostReviewImpl,
    PostMetaImpl
} from "../model/post/PostProductRequestBodyImpl";
import {
    PutDimensionsImpl,
    PutMetaImpl,
    PutProductModelImpl,
    PutReviewImpl
} from "../model/put/PutProductRequestBodyImpl";
import {PatchProductRequestBody} from "../model/patch/PatchProductRequestBody";
import {
    PostDimensionsInvalid,
    PostMetaInvalid,
    PostProductModelInvalid,
    PostReviewInvalid
} from "../model/post/PostProductRequestBodyInvalidImpl";
import {PatchProductRequestBodyInvalid} from "../model/patch/PatchProductRequestBodyInvalid";
import {
    PutDimensionsInvalid,
    PutMetaInvalid,
    PutProductModelInvalid,
    PutReviewInvalid
} from "../model/put/PutProductRequestBodyInvalid";

export class ProductPredefinedPayloads {
    static postProduct = new PostProductModelImpl(
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
        new PostDimensionsImpl(23.17, 14.43, 28.01),
        "1 month warranty",
        "Ships in 1 month",
        "Low Stock",
        [
            new PostReviewImpl(
                2,
                "Very unhappy with my purchase!",
                "2024-05-23T08:56:21.618Z",
                "John Doe",
                "john.doe@x.dummyjson.com"
            ),
            new PostReviewImpl(
                2,
                "Not as described!",
                "2024-05-23T08:56:21.618Z",
                "Nolan Gonzalez",
                "nolan.gonzalez@x.dummyjson.com"
            ),
            new PostReviewImpl(
                5,
                "Very satisfied!",
                "2024-05-23T08:56:21.618Z",
                "Scarlett Wright",
                "scarlett.wright@x.dummyjson.com"
            )
        ],
        "30 days return policy",
        24,
        new PostMetaImpl(
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
        new PutDimensionsImpl(23.17, 14.43, 28.01),
        "1 month warranty",
        "Ships in 1 month",
        "Low Stock",
        [
            new PutReviewImpl(
                2,
                "Very unhappy with my purchase!",
                "2024-05-23T08:56:21.618Z",
                "John Doe",
                "john.doe@x.dummyjson.com"
            ),
            new PutReviewImpl(
                2,
                "Not as described!",
                "2024-05-23T08:56:21.618Z",
                "Nolan Gonzalez",
                "nolan.gonzalez@x.dummyjson.com"
            ),
            new PutReviewImpl(
                5,
                "Very satisfied!",
                "2024-05-23T08:56:21.618Z",
                "Scarlett Wright",
                "scarlett.wright@x.dummyjson.com"
            )
        ],
        "30 days return policy",
        24,
        new PutMetaImpl(
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

    // invalid types for most
    static postProductInvalidFields: PostProductModelInvalid = new PostProductModelInvalid(
        12345,
        67890,
        111,
        "cheap",
        "high",
        "excellent",
        "many",
        [101, 102],
        202,
        303,
        "heavy",
        new PostDimensionsInvalid("wide", "tall", "deep"),
        404,
        505,
        606,
        [
            new PostReviewInvalid("bad", 123, 999999, 888, 777),
            new PostReviewInvalid("ok", 321, 111111, 666, 555)
        ],
        909,
        "one",
        new PostMetaInvalid(
            "not-a-date",
            "still-not-a-date",
            "not-a-barcode",
            "no-qr"
        ),
        1010,
        [2020, 3030, 4040]
    );

    static patchProductInvalidFields: PatchProductRequestBodyInvalid = {
        "title": 12345,
        "description": 67890,
        "category": 111,
        "price": "cheap",
        "discountPercentage": "high"
    }

    static putProductInvalidFields: PutProductModelInvalid = new PutProductModelInvalid(
        99999,
        88888,
        777,
        "wrong-price",
        "not-a-discount",
        "invalid-rating",
        "not-a-stock-value",
        [123, 456],
        789,
        654,
        "too-heavy",
        new PutDimensionsInvalid("wide-ish", "taller", "deeper"),
        111,
        222,
        333,
        [
            new PutReviewInvalid("low", 404, 112233, 444, 555),
            new PutReviewInvalid("meh", 505, 223344, 666, 777)
        ],
        888,
        "many",
        new PutMetaInvalid(
            "wrong-date",
            "another-bad-date",
            "not-a-barcode",
            "bad-qr"
        ),
        999,
        [1010, 2020, 3030]
    );


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
