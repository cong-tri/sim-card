import { Amplify, type ResourcesConfig } from "aws-amplify";
import { CookieStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import output from "../amplifyconfiguration.json";

export const authConfig: ResourcesConfig["Auth"] = {
  Cognito: {
    userPoolClientId: "5uk4dc2q76f3aqi6lgotacd195",
    userPoolId: "ap-southeast-1_jveHfsJ5Y",
  },
};

Amplify.configure(output as AmplifyOutputs, { ssr: true });

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
