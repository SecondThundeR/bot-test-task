export const tableQuery = `
CREATE TABLE IF NOT EXISTS "weatherNotify" (
  "id" SERIAL,
  "userID" INTEGER UNIQUE NOT NULL,
  "time" VARCHAR(5) NOT NULL,
  "city" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("id")
);` as const;

export const getUserNotifications =
  'SELECT "userID", "time", "city" FROM "weatherNotify";' as const;
export const getUserNotification =
  'SELECT * FROM "weatherNotify" WHERE "userID" = $1;' as const;
export const setUserNotification =
  'INSERT INTO "weatherNotify"("userID", "city", "time") VALUES($1, $2, $3) RETURNING *;' as const;
export const removeUserNotification =
  'DELETE FROM "weatherNotify" WHERE "userID" = $1;' as const;
