import { connectDatabase, databaseReady } from "./config/database.js";
import { assertProductionEnv } from "./config/env.js";
import { seedAdminAccount } from "./services/seedAdmin.js";
import { seedCmsContent } from "./services/seedCms.js";

let bootstrapPromise = null;

export function initializePersistence() {
  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      assertProductionEnv();
      await connectDatabase();

      if (databaseReady()) {
        await seedCmsContent();
        await seedAdminAccount();
      }

      return databaseReady();
    })().catch((error) => {
      bootstrapPromise = null;
      throw error;
    });
  }

  return bootstrapPromise;
}
