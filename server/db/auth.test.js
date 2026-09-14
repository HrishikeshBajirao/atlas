import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, checkHashPassword, makeJWT, validateJWT } from "./auth.js";

describe("Password Hashing", () => {
    const password1 = "12345678";
    const password2 = "abcdefgh";
    let hash1;
    let hash2;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
    });

    it("should return true for the correct password", async () => {
        const result1 = await checkHashPassword(hash1, password1);
        const result2 = await checkHashPassword(hash2, password2);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    })
})

describe("JWT", () => {
    const userID1 = "6460a8e7-837c-406b-89c9-c7faf987b5c2";
    const secret1 = "secret";
    const userID2 = "a63aefc6-cf62-4b77-b5f2-2ece708790b4";
    let token1;
    let token2;

    beforeAll(() => {
        token1 = makeJWT(userID1, 30, secret1)
        token2 = makeJWT(userID2, 30, secret1)
    });

    it("should return true for correct JWT", async () => {
        const payload1 = validateJWT(token1, secret1);
        const payload2 = validateJWT(token2, secret1);

        expect(payload1).toBe(userID1);
        expect(payload2).toBe(userID2);
    });

    it("should throw for wrong secret", () => {
        expect(() => validateJWT(token1, "wrong-secret")).toThrow("Invalid or Expired JWT");
    });

    it("should throw for expired token", () => {
        const expiredToken = makeJWT(userID1, -1, secret1);
      
        expect(() => validateJWT(expiredToken, secret1)).toThrow("Invalid or Expired JWT");
    });
})