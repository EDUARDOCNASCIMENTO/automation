import { test, expect, APIRequestContext } from "@playwright/test";
import { Env } from "../../../../config/config";

export class MessageActions {
  private reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  // POST USER REQUEST
  public async postCategories(body: any, returns: any, status: number) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("01 - POST new category", async () => {
      const response = await this.reqContext.post(`/api/v1/categories`, {
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
      Env.CATEGORY_ID = callResponse.id;
      expect
        .soft(
          callResponse,
          `ID: ${Env.CATEGORY_ID} created for this category, is now saved.`
        )
        .toEqual(returns);
    });
  }

  // GET ALL USERS REQUEST
  public async getCategories(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("1 - GET all categories", async () => {
      const response = await this.reqContext.get(`/api/v1/categories`, {
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
  public async getCategoryById(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - GET categories by ID: ${Env.CATEGORY_ID}`, async () => {
      const response = await this.reqContext.get(
        `/api/v1/categories/${Env.CATEGORY_ID}`,
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
  public async putCategory(body: any, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`01 - PUT category identified as Id: ${Env.CATEGORY_ID}`, async () => {
      const response = await this.reqContext.put(
        `/api/v1/categories/${Env.CATEGORY_ID}`,
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
  public async deleteCategory(returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step(`1 - DELETE CATEGORY ID: ${Env.CATEGORY_ID}`, async () => {
      const response = await this.reqContext.delete(
        `/api/v1/categories/${Env.CATEGORY_ID}`,
        {
          headers: {
            "x-auth-token": `${Env.TOKEN}`,
          },
        }
      );
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`2 - Validate DELETE category status: ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("3 - Validate DELETE response", async () => {
      expect
        .soft(callResponse, "The response does match the expected body.")
        .toEqual(returns);
    });
  }
}
