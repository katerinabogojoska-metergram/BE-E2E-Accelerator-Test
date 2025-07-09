import {expect, test} from "@jest/globals";


export function sharedTests(token:any){
    expect(token).not.toBeNull();
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token).toContain(process.env.TOKEN_CONTAIN);
}