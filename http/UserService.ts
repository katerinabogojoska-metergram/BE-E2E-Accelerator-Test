import {BaseClient} from "./BaseClient";
import {PostUserRequestBodyImpl} from "../model/post/PostUserRequestBodyImpl";
import { ResponseEntity } from "express";
import {PostUserResponseBody} from "../model/post/PostUserResponseBody";
import {PostUserRequestBodyInvalid} from "../model/post/PostUserRequestBodyInvalid";

export class UserService{
    private readonly client: BaseClient;

    constructor(_client: BaseClient) {
        this.client = _client;
    }

    public postUser(payload?: PostUserRequestBodyImpl, payloadInvalid?: PostUserRequestBodyInvalid): ResponseEntity<PostUserResponseBody> {
        if(payload) {
            return this.client.post("users/add", payload)
        } else if(payloadInvalid) {
            return this.client.post("users/add", payloadInvalid)
        } else {
            console.error("Both payloads cannot be null")
        }
    }
}