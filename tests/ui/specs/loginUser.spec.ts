import { test } from "../fixtures/demoFixtures";

test.describe.only("LOGIN USER", () => {
  test("Validate the login user", async ({ login }) => {
    await login.goto();
    await login.fillUser();
    await login.fillPassword();
    await login.clickLogin();
    //await login.checkLogin();
  });
});
 