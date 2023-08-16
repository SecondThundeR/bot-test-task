export const TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS "weatherNotify" (
  "id" SERIAL,
  "userID" INTEGER UNIQUE NOT NULL,
  "time" VARCHAR(5) NOT NULL,
  "city" VARCHAR(100) NOT NULL,
  PRIMARY KEY ("id")
);` as const;

export const TODOS_QUERY = `
CREATE TABLE IF NOT EXISTS "userTodos" (
  "id" SERIAL,
  "userID" INTEGER NOT NULL,
  "text" VARCHAR(200) NOT NULL,
  "done" BOOLEAN NOT NULL,
  "date" VARCHAR(10),
  "time" VARCHAR(5),
  PRIMARY KEY ("id")
);` as const;

export const GET_WEATHER_NOTIFICATIONS =
  'SELECT "userID", "time", "city" FROM "weatherNotify";' as const;
export const SET_WEATHER_NOTIFICATION =
  'INSERT INTO "weatherNotify"("userID", "city", "time") VALUES($1, $2, $3);' as const;
export const REMOVE_WEATHER_NOTIFICATION =
  'DELETE FROM "weatherNotify" WHERE "userID" = $1;' as const;

export const GET_USERS_TODOS =
  'SELECT * FROM "userTodos" ORDER BY "id"' as const;
export const SET_USER_TODO =
  'INSERT INTO "userTodos"("userID", "text", "done") VALUES($1, $2, $3) RETURNING *;' as const;
export const UPDATE_USER_TODO_TEXT =
  'UPDATE "userTodos" SET "text" = $1 WHERE "id" = $2;' as const;
export const UPDATE_USER_TODO_DONE =
  'UPDATE "userTodos" SET "done" = $1 WHERE "id" = $2;' as const;
export const UPDATE_USER_TODO_NOTIFICATION =
  'UPDATE "userTodos" SET "date" = $1, "time" = $2 WHERE "id" = $3;' as const;
export const RESET_USER_TODO_NOTIFICATION =
  'UPDATE "userTodos" SET "date" = NULL, "time" = NULL WHERE "id" = $1;' as const;
export const REMOVE_USER_TODO =
  'DELETE FROM "userTodos" WHERE "id" = $1;' as const;
export const REMOVE_USER_TODOS =
  'DELETE FROM "userTodos" WHERE "userID" = $1;' as const;
