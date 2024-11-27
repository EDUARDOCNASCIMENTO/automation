// fixtures/userFixtures.ts
import { test as base } from "@playwright/test";
import { MessageData } from "../pom/data/messageDataUsers";
import { MessageActions } from "../pom/actions/messageActionsUsers";

type usersFixtures = {
    messageData: MessageData;
    messageActions: MessageActions;
  };

  export const test = base.extend<usersFixtures>({
    messageData: async ({}, use) => {
      const data = new MessageData();
      await use(data);
    },
    messageActions: async ({ request }, use) => {
      const actions = new MessageActions(request);
      await use(actions);
    },
  });
  
  export { expect } from "@playwright/test";