import { test, expect, APIRequestContext } from "@playwright/test";
import { Env } from "../../../../config/config";

export class MessageActions {
  private reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  // POST USER REQUEST
  public async postUser(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST new user", async () => {
      const response = await this.reqContext.post(`/api/v1/users`, {
        data: body,
      });
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the POST response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });

    await test.step(`04 - Get the user ID for future tests: ${callResponse.id}`, async () => {
      Env.USER_ID = callResponse.id;
      expect
        .soft(
          callResponse,
          `ID: ${process.env.USER_ID} created for this user, is now saved.`
        )
        .toEqual(returns);
    });
  }

  // GET ALL USERS REQUEST
  public async getUsers(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("1 - GET all users", async () => {
      const response = await this.reqContext.get(`/api/v1/users`, {
        headers: {
          "x-auth-token": `${Env.TOKEN}`,
        },
      });
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate GET status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate GET response", async () => {
      expect
        .soft(callResponse[0], "The response does match the expected body.")
        .toEqual(returns);
    });
  }

  // GET USER BY ID REQUEST
  public async getUserById(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - GET user by ID: ${Env.USER_ID}`, async () => {
      const response = await this.reqContext.get(
        `/api/v1/users/${Env.USER_ID}`,
        {
          headers: {
            "x-auth-token": `${Env.TOKEN}`,
          },
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate GET status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate GET response", async () => {
      expect
        .soft(callResponse, "The GET response does match the expected body.")
        .toEqual(returns);
    });
  }

  // PUT USER REQUEST
  public async putUser(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - PUT user identified as Id: ${Env.USER_ID}`, async () => {
      const response = await this.reqContext.put(
        `/api/v1/users/${Env.USER_ID}`,
        {
          data: body,
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`02 - Validate the Status: ${status}.`, async () => {
      expect(statusResponse, "Expected status.").toBe(status);
    });

    await test.step("03 - Validate the PUT response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }

  // DELETE USER REQUEST
  public async deleteUser(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`1 - DELETE USER: ${Env.USER_ID}`, async () => {
      const response = await this.reqContext.delete(
        `/api/v1/users/${Env.USER_ID}`,
        {
          headers: {
            "x-auth-token": `${Env.TOKEN}`,
          },
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate DELETE user status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate DELETE response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }
}
