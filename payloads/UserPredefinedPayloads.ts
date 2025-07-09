import {PostUserRequestBodyImpl} from "../model/post/PostUserRequestBodyImpl";
import {PostUserRequestBodyInvalid} from "../model/post/PostUserRequestBodyInvalid";

export class UserPredefinedPayloads{
    static postUser = new PostUserRequestBodyImpl(
        "emilia", "clarke", 38
    );

    static postUserInvalidFields = new PostUserRequestBodyInvalid(
        123132, 332211, "emilia"
    );

    static postUserImpossibleAge = new PostUserRequestBodyImpl(
        "emilia", "clarke", 300
    );
}