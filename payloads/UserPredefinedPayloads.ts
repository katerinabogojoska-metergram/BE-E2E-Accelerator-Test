import {PostUserRequestBodyImpl} from "../model/post/PostUserRequestBodyImpl";

export class UserPredefinedPayloads{
    static postUser = new PostUserRequestBodyImpl(
        "emilia", "clarke", 38
    );
}