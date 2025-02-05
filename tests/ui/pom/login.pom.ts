import { type Locator,type Page } from "@playwright/test";
import { step } from "../fixtures/demoFixtures";

export class login {
  public name = "Login";
  readonly page: Page;
  
  readonly inputUser: Locator;
  readonly inputPassword: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page, name = "Login POM") {
    this.page = page;
    this.name = name;

    this.inputUser = page.locator('[data-qa="login-email"]')
    this.inputPassword = page.locator('[data-qa="login-password"]')
    this.loginButton = page.locator('[data-qa="login-button"]')
    this.logoutLink = page.locator('i.fa.fa-lock');
  }

  async goto() {
    await this.page.goto("/login", {
      waitUntil: "domcontentloaded",
    });
  }

  @step("01 - Input User")
  async fillUser() {
    await this.inputUser.fill("jose@jose.com");
  }

  @step("02- Input Password")
  async fillPassword() {
    await this.inputPassword.fill("123456");
  }

  @step("03- Click to Sign Up")
  async clickLogin() {
    await this.loginButton.click();
  }
/*
  @step("04- Check if its logged")
  async checkLogin() {
    await this.logoutLink.isHidden();
  }
    */
}