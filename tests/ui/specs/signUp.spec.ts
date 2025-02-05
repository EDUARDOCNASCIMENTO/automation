import { test } from "../fixtures/demoFixtures";

test.describe.only("SIGN UP", () => {
  test("Validate the register new user", async ({ signUp }) => {
    await signUp.goto();
    await signUp.fillFullName();
    await signUp.fillEmail();
    await signUp.clickSignUp();
    await signUp.selectGender();
    await signUp.fillPassword();
    await signUp.selectDate();
    await signUp.inputFirstName();
    await signUp.inputLastName();
    await signUp.inputCompany();
    await signUp.inputFirstAddress()
    await signUp.inputSecondAddress()
    await signUp.selectCountry()
    await signUp.inputState()
    await signUp.inputCity()
    await signUp.inputZipCode()
    await signUp.inputMobileNumber()
    await signUp.createAccount()
    await signUp.waitForURL()
  });
});
 