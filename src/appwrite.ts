import { Client } from "appwrite";
import { config } from "../config";
export const appwrite = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.projectId);