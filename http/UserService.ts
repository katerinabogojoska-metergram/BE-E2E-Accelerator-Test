import {BaseClient} from "./BaseClient";
import {PostUserRequestBodyImpl} from "../model/post/PostUserRequestBodyImpl";
import { ResponseEntity } from "express";
import {PostUserResponseBody} from "../model/post/PostUserResponseBody";

export class UserService{
    private readonly client: BaseClient;

    constructor(_client: BaseClient) {
        this.client = _client;
    }

    public postUser(payload: PostUserRequestBodyImpl): ResponseEntity<PostUserResponseBody> {
        return this.client.post("users/add", payload)
    }
}