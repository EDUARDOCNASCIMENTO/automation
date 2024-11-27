import { test as base } from "@playwright/test";
import { practiceForm } from "../pom/practiceForm.pom"
import { practiceSlider } from "../pom/practiceSlider.pom"

type MyFixtures = {
  practiceForm: practiceForm;
  practiceSlider: practiceSlider;
};

export const test = base.extend<MyFixtures>({
  practiceForm: async ({ page }, use) => {
    await use(new practiceForm(page));
  },
});

export { expect } from "@playwright/test";
/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
  return function decorator(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(...args: any) {
      const name = `${stepName || (context.name as string)} (${this.name})`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
