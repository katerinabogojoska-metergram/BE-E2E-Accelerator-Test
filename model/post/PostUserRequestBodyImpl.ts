import {PostUserRequestBody} from './PostUserRequestBody';

export class PostUserRequestBodyImpl implements PostUserRequestBody{
    firstName: string;
    lastName: string;
    age: number;

    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}