import {BaseClient} from "./BaseClient";
import {PostAuthRequestBody} from "../model/auth/PostAuthRequestBody";
import {PostAuthResponseBody} from "../model/auth/PostAuthResponseBody";
import {ResponseEntity} from "express";

export class AuthClient {
    private readonly client: BaseClient;
    private static readonly authenticate = "auth/login";
    token: string;

    private postAuthRequestBody: PostAuthRequestBody = {
        username: process.env.TESTUSERNAME,
        password: process.env.PASSWORD
    };

    constructor(_client: BaseClient) {
        this.client = _client;
    }

    public async authenticateOnTheSite(postAuthRequestBody: PostAuthRequestBody): ResponseEntity<PostAuthResponseBody> {
        // console.log(postAuthRequestBody);
        // console.log(AuthClient.authenticate);
        return await this.client.post(AuthClient.authenticate, postAuthRequestBody);
    }

    async init() {
        try {
            const responseEntity = await this.authenticateOnTheSite(this.postAuthRequestBody);
            const ticket = responseEntity?.data?.accessToken;

            if (ticket) {
                this.token = ticket;
                this.client.addHeader("Content-Type", "application/json");
                this.client.addHeader("Authorization", `Bearer ${this.token}`);
                // console.log(this.token)
            } else {
                console.error("Failed to authenticate or obtain token.");
            }
        } catch (error: any) {
            console.error("Error while authenticating:", error.message || error);
        }
    }
}