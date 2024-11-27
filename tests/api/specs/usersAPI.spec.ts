import { test } from "../fixtures/commomFixtures"

test.describe.serial("Validate API", () => {
  test('01 - GET ALL USERS', async ({ messageActions, messageData }) => {
    await messageActions.getUsers(messageData.responseGetUser, 200);
  });

  test('02 - POST NEW USER', async ({ messageActions, messageData }) => {
    await messageActions.postUser(messageData.payloadPostUser, messageData.responsePostUser, 201);
  });

  test('03 - GET USER BY ID', async ({ messageActions, messageData }) => {
    await messageActions.getUserById(messageData.responsePostUser, 200);
  });

  test('04 - PUT USER', async ({ messageActions, messageData }) => {
    await messageActions.putUser(messageData.payloadPutUser, messageData.responsePutUser, 200);
  });

  test('05 - DELETE USER', async ({ messageActions}) => {
    await messageActions.deleteUser(true, 200);
  });

  test('06 - DELETE USER WITH INVALID ID', async ({ messageActions, messageData }) => {
    await messageActions.deleteUser(messageData.responseDeleteInvalidID, 400);
  });

  test('07 - POST USER WITH INVALID E-MAIL', async ({ messageActions, messageData }) => {
    await messageActions.postUser(messageData.payloadPostUserInvalidEmail, messageData.responseUserInvalidEmail, 400);
  });
}); 