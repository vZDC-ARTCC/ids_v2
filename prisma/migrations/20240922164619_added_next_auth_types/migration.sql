-- CreateTable
CREATE TABLE "Log"
(
    "id"      TEXT         NOT NULL,
    "message" TEXT         NOT NULL,
    "date"    TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account"
(
    "id"                TEXT NOT NULL,
    "userId"            TEXT NOT NULL,
    "type"              TEXT NOT NULL,
    "provider"          TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token"     TEXT,
    "access_token"      TEXT,
    "expires_at"        INTEGER,
    "token_type"        TEXT,
    "scopes"            TEXT[],
    "id_token"          TEXT,
    "session_state"     TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session"
(
    "id"           TEXT         NOT NULL,
    "sessionToken" TEXT         NOT NULL,
    "userId"       TEXT         NOT NULL,
    "expires"      TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User"
(
    "id"            TEXT    NOT NULL,
    "cid"           TEXT    NOT NULL,
    "firstName"     TEXT,
    "lastName"      TEXT,
    "fullName"      TEXT,
    "email"         TEXT,
    "emailVerified" TIMESTAMP(3),
    "artcc"         TEXT    NOT NULL,
    "rating"        INTEGER NOT NULL,
    "division"      TEXT    NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken"
(
    "identifier" TEXT         NOT NULL,
    "token"      TEXT         NOT NULL,
    "expires"    TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account" ("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session" ("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken" ("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken" ("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
