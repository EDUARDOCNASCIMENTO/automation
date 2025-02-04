import { test } from "../fixtures/demoFixtures";

test.describe.only("Validate Sign Up", () => {
  test("Validate the create new user", async ({ signUp }) => {
    await signUp.goto();
    await signUp.fillFullName();
    await signUp.fillEmail();
    await signUp.clickSignUp();
    await signUp.selectGender();
  });
});
 