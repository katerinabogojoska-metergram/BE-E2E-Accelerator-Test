import {PostUserRequestBody} from "./PostUserRequestBody";

export class PostUserRequestBodyInvalid implements PostUserRequestBody<number,string> {
    firstName: number;
    lastName: number;
    age: string;

    constructor(firstName: number, lastName: number, age: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}