import { type Locator, type Page, expect } from "@playwright/test";
import { step } from "../fixtures/demoFixtures";
import { faker } from "@faker-js/faker";

const fullName = faker.person.fullName();
const email = faker.internet.email();

export class signUp {
  public name = "Sign Up";
  readonly page: Page;
  
  readonly inputFullName: Locator;
  readonly inputEmail: Locator;
  readonly signUpButton: Locator;
  readonly maleGender: Locator
  readonly femaleGender: Locator

  constructor(page: Page, name = "Sign Up POM") {
    this.page = page;
    this.name = name;

    //EVITAR COOKIES, BANNERS
    page.addLocatorHandler(
    page.getByRole("button", { name: "Accept All" }),
      async () => {
        await page.getByRole("button", { name: "Accept All" }).click();
        await expect(
          page.getByRole("button", { name: "Accept All" })
        ).not.toBeVisible();
      }
    )

    this.inputFullName = page.locator('[data-qa="signup-name"]');
    this.inputEmail = page.locator('[data-qa="signup-email"]');
    this.signUpButton = page.locator('[data-qa="signup-button"]')
    this.maleGender = page.locator('[id="id_gender1"]');
    this.femaleGender = page.locator('[id="id_gender2"]');

  }

  async goto() {
    await this.page.goto("/signup", {
      waitUntil: "domcontentloaded",
    });
  }

  @step("1 - Fill Full Name")
  async fillFullName() {
    await this.inputFullName.fill(fullName);
  }

  @step("2- Fill E-mail")
  async fillEmail() {
    await this.inputEmail.fill(email);
  }

  @step("3- Click to Sign Up")
  async clickSignUp() {
    await this.signUpButton.click();
  }

  @step("4- Check female Gender")
  async selectGender() {
    await this.femaleGender.check()
  }
}