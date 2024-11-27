import { test as base } from "@playwright/test";


import { MessageData as CategoriesData } from "../pom/data/messageDataCategories";
import { MessageActions as CategoriesActions } from "../pom/actions/messageActionsCategories";
import { MessageData as UsersData } from "../pom/data/messageDataUsers";
import { MessageActions as UsersActions } from "../pom/actions/messageActionsUsers";


type CommonFixtures = {
  messageData: any;
  messageActions: any;
};

// Mapeamento de palavras-chave para classes
const contextMap = {
  CATEGORY: { data: CategoriesData, actions: CategoriesActions },
  USER: { data: UsersData, actions: UsersActions },
};

function getContextClasses(title: string) {
  const contextKey = Object.keys(contextMap).find((key) =>
    title.toUpperCase().includes(key)
  );

  if (!contextKey || !contextMap[contextKey]) {
    throw new Error(`No context found for test: ${title}`);
  }

  return contextMap[contextKey];
}

export const test = base.extend<CommonFixtures>({
  messageData: async ({}, use, testInfo) => {
    const { data } = getContextClasses(testInfo.title);
    await use(new data());
  },

  messageActions: async ({ request }, use, testInfo) => {
    const { actions } = getContextClasses(testInfo.title);
    await use(new actions(request));
  },
});

export { expect } from "@playwright/test";
