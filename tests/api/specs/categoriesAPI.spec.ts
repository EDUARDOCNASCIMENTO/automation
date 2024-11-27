import { test } from "../fixtures/commomFixtures"

test.describe.serial("Validate API", () => {
  test('01 - GET ALL CATEGORY', async ({ messageActions, messageData }) => {
    await messageActions.getCategories(messageData.responseGetCategories, 200);
  });
 
  test('02 - POST NEW CATEGORY', async ({ messageActions, messageData }) => {
    await messageActions.postCategories(messageData.payloadPostCategories, messageData.responsePostCategories, 201);
  });

  test('03 - GET CATEGORY BY ID', async ({ messageActions, messageData }) => {
    await messageActions.getCategoryById(messageData.responsePostCategories, 200);
  });

  test('04 - PUT CATEGORY', async ({ messageActions, messageData }) => {
    await messageActions.putCategory(messageData.payloadPutCategories, messageData.responsePutCategories, 200);
  });

  test('05 - DELETE CATEGORY', async ({ messageActions }) => {
    await messageActions.deleteCategory(true, 200);
  }); 
}); 