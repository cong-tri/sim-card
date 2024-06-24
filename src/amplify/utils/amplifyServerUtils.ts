
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { AmplifyOutputs } from "aws-amplify/adapter-core";
import output from "../amplifyconfiguration.json";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: output as AmplifyOutputs,
});

