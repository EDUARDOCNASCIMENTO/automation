import { type Locator, type Page, expect } from "@playwright/test";
import { step } from "../fixtures/demoFixtures";
import { faker } from "@faker-js/faker";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const mobile = "345095450";

export class practiceForm {
  public name = "Practice Form";
  readonly page: Page;
  
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputEmail: Locator;
  readonly inputGender: Locator;
  readonly inputMobile: Locator;
  readonly inputBirthDay: Locator;
  readonly inputBirthMonth: Locator;
  readonly inputBirthYear: Locator;
  readonly inputCalendar: Locator;
  readonly inputSubjects: Locator;
  readonly selectHobbies: Locator;
  readonly uploadFile: Locator;
  readonly currentAddress: Locator;
  readonly submitButton:Locator;
  readonly successModal: Locator;

  constructor(page: Page, name = "Practice Form POM") {
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

    this.inputFirstName = page.locator("id=firstName");
    this.inputLastName = page.locator("id=lastName");
    this.inputEmail = page.locator("id=userEmail");
    this.inputGender = page.locator("id=gender-radio-2");
    this.inputMobile = page.locator("id=userNumber");
    this.inputCalendar = page.locator("id=dateOfBirthInput")
    this.inputBirthDay = page.locator('.react-datepicker__day--002:not(.react-datepicker__day--outside-month)');
    this.inputBirthMonth = page.locator('.react-datepicker__month-select');
    this.inputBirthYear = page.locator('.react-datepicker__year-select');
    this.selectHobbies = page.locator("id=hobbies-checkbox-2");
    this.uploadFile = page.locator("id=uploadPicture");
/*     this.inputSubjects = page.locator(".css-12jo7m5 subjects-auto-complete__multi-value__label"); */
    this.currentAddress = page.locator('.form-control');
    this.submitButton = page.locator("id=submit");
    this.successModal = page.locator("id=example-modal-sizes-title-lg")
  }

  async goto() {
    await this.page.goto("/automation-practice-form", {
      waitUntil: "domcontentloaded",
    });
  }

  @step("1 - Fill Full Name")
  async fillFirstNameField() {
    await this.inputFirstName.fill(firstName);
  }

  @step("2 - Fill Last Name")
  async fillLastNameField() {
    await this.inputLastName.fill(lastName);
  }

  @step("3- Fill E-mail")
  async fillEmail() {
    await this.inputEmail.fill(email);
  }

  @step("4 - Fill Gender")
  async fillGender() {
    await this.inputGender.isEnabled();
    await this.inputGender.check({ force: true });
    await this.inputGender.isChecked();
  }

  @step("5 - Fill Mobile Number")
  async fillMobile() {
    await this.inputMobile.fill(mobile);
  }

  @step("6 - Select the Date of Birth")
  async fillBirthDate() {
  await this.inputCalendar.click();
  await this.inputBirthYear.click();
  await this.inputBirthMonth.click();
  await this.inputBirthDay.click();
  }

  @step("7 - Input Check Box")
  async fillHobbies() {
  await this.selectHobbies.check({ force: true });
  }

/*   @step("8 - Fill Subjects")
  async fillSubjects() {
  await this.inputSubjects.selectOption("Arts", { force: true });
  } */

  @step("9 - Upload File")
  async fillUpload() {
  await this.uploadFile.click();
  await this.uploadFile.setInputFiles("\images/valtertaruga.jpg");
  }

  @step("10 - Fill Current Address")
  async fillCurrentAdress() {
  await this.currentAddress.fill("Rua Marechal Octavio");
  }

  @step("11 - Click to Submit and Verify ")
  async clickSubmit() {
  await this.submitButton.click();
  await this.successModal.isVisible();
  }
}