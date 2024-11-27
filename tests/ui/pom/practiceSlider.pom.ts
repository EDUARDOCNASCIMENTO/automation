import { type Locator, type Page } from "@playwright/test";
import { step } from "../fixtures/demoFixtures";

export class practiceSlider{
  public name = "Practice Slider";
  readonly page: Page;
  readonly inputFirstName: Locator;

  constructor(page: Page, name = "Practice Slider POM") {
    this.page = page;
    this.name = name;
    this.inputFirstName = page.locator("id=firstName");
  }

  async goto() {
    await this.page.goto("/slider", {
      waitUntil: "domcontentloaded",
    });
  }

  @step("1 - Fill Full Name")
  async fillFirstNameField() {
    await this.inputFirstName.fill('A');
  }
}