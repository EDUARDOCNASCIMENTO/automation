import { type Locator,type Page } from "@playwright/test";
import { step } from "../fixtures/demoFixtures";
import { faker } from "@faker-js/faker";

const fullName = faker.person.fullName();
const email = faker.internet.email();
const password = faker.internet.password();
const name = faker.person.firstName()
const lastName = faker.person.lastName()
const company = faker.company.name()
const address = faker.location.streetAddress()
const address2 = faker.location.streetAddress()
const city = faker.location.city()
const state = faker.location.state()
const zipcode = faker.location.zipCode()
const mobile = faker.phone.number()

export class signUp {
  public name = "Sign Up";
  readonly page: Page;
  
  readonly inputFullName: Locator;
  readonly inputEmail: Locator;
  readonly signUpButton: Locator;
  readonly maleGender: Locator
  readonly femaleGender: Locator
  readonly inputPassword: Locator
  readonly selectDay: Locator
  readonly selectMonth: Locator
  readonly selectYear: Locator
  readonly newsletterCheckbox: Locator
  readonly offersCheckbox: Locator
  readonly firstName : Locator
  readonly lastName : Locator
  readonly companyName: Locator
  readonly firstAddress: Locator
  readonly secondAddress: Locator
  readonly country: Locator
  readonly state: Locator
  readonly city: Locator
  readonly zipCode : Locator
  readonly mobileNumber: Locator
  readonly createAccountButton: Locator

  constructor(page: Page, name = "Sign Up POM") {
    this.page = page;
    this.name = name;

    this.inputFullName = page.locator('[data-qa="signup-name"]')
    this.inputEmail = page.locator('[data-qa="signup-email"]')
    this.signUpButton = page.locator('[data-qa="signup-button"]')
    this.maleGender = page.locator('[id="id_gender1"]')
    this.femaleGender = page.locator('[id="id_gender2"]')
    this.inputPassword = page.locator('[data-qa="password"]')
    this.selectDay = page.locator('[data-qa="days"]')
    this.selectMonth = page.locator('[data-qa="months"]')
    this.selectYear = page.locator('[data-qa="years"]')
    this.newsletterCheckbox = page.locator('[id="newsletter"]')
    this.offersCheckbox = page.locator('[id="optin"]')
    this.firstName = page.locator('[data-qa="first_name"]')
    this.lastName = page.locator('[data-qa="last_name"]')
    this.companyName = page.locator('[data-qa="company"]')
    this.firstAddress = page.locator('[data-qa="address"]')
    this.secondAddress = page.locator('[data-qa="address2"]')
    this.country = page.locator('[data-qa="country"]')
    this.city = page.locator('[data-qa="city"]')
    this.state = page.locator('[data-qa="state"]')
    this.zipCode = page.locator('[data-qa="zipcode"]')
    this.mobileNumber = page.locator('[data-qa="mobile_number"]')
    this.createAccountButton = page.locator('[data-qa="create-account"]')
  }

  async goto() {
    await this.page.goto("/signup", {
      waitUntil: "domcontentloaded",
    });
  }

  @step("01 - Fill Full Name")
  async fillFullName() {
    await this.inputFullName.fill(fullName);
  }

  @step("02- Fill E-mail")
  async fillEmail() {
    await this.inputEmail.fill(email);
  }

  @step("03- Click to Sign Up")
  async clickSignUp() {
    await this.signUpButton.click();
  }

  @step("04- Check female Gender")
  async selectGender() {
    await this.femaleGender.check()
  }

  @step("05- Fill Password")
  async fillPassword() {
    await this.inputPassword.fill(password)
  }

  @step("06- Select Date")
  async selectDate() {
    await this.selectDay.selectOption("3")
    await this.selectMonth.selectOption("March")
    await this.selectYear.selectOption("1988")
  }

  @step("07- Input First Name")
  async inputFirstName() {
    await this.firstName.fill(name)
  }

  @step("08- Input Last Name")
  async inputLastName() {
    await this.lastName.fill(lastName)
  }

  @step("09- Input Company")
  async inputCompany() {
    await this.companyName.fill(company)
  }

  @step("10- Input First Address")
  async inputFirstAddress() {
    await this.firstAddress.fill(address)
  }
  
  @step("11- Input Second Address")
  async inputSecondAddress() {
    await this.secondAddress.fill(address2)
  }

  @step("12- Select Country")
  async selectCountry() {
    await this.country.selectOption("Australia")
  }

  @step("13- Input City")
  async inputCity() {
    await this.city.fill(city)
  }

  @step("14- Input State")
  async inputState() {
    await this.state.fill(state)
  }

  @step("15- Input Zip Code")
  async inputZipCode() {
    await this.zipCode.fill(zipcode)
  }

  @step("16- Input Mobile Number")
  async inputMobileNumber() {
    await this.mobileNumber.fill(mobile)
  }

  @step("17- Click to Create Account Button")
  async createAccount() {
    await this.createAccountButton.click()
  }

  @step("18- Wait for URL")
  async waitForURL() {
    await this.page.waitForURL('/account_created');
  }
}