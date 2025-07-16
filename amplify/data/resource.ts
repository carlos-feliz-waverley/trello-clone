import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
const schema = a.schema({
  Task: a
    .model({
      title: a.string(),
      description: a.string(),
      assignee: a.string(),
      status: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

