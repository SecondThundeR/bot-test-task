export const TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS "weatherNotify" (
  "id" SERIAL,
  "userID" INTEGER UNIQUE NOT NULL,
  "time" VARCHAR(5) NOT NULL,
  "city" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("id")
);` as const;

export const GET_WEATHER_NOTIFICATIONS =
  'SELECT "userID", "time", "city" FROM "weatherNotify";' as const;
export const GET_WEATHER_NOTIFICATION =
  'SELECT * FROM "weatherNotify" WHERE "userID" = $1;' as const;
export const SET_WEATHER_NOTIFICATION =
  'INSERT INTO "weatherNotify"("userID", "city", "time") VALUES($1, $2, $3) RETURNING *;' as const;
export const REMOVE_WEATHER_NOTIFICATION =
  'DELETE FROM "weatherNotify" WHERE "userID" = $1;' as const;
