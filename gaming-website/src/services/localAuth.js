const ACCOUNTS_KEY = "game-and-glory-accounts";
const SESSION_KEY = "game-and-glory-session";
const HASH_ITERATIONS = 120_000;

const encodeBytes = (bytes) => btoa(String.fromCharCode(...bytes));

const decodeBytes = (value) => (
  Uint8Array.from(atob(value), (character) => character.charCodeAt(0))
);

const derivePasswordHash = async (password, salt) => {
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: HASH_ITERATIONS,
    },
    passwordKey,
    256,
  );
  return encodeBytes(new Uint8Array(hash));
};

const readAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const getLocalSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const registerLocalAccount = async ({ username, email, password }) => {
  const accounts = readAccounts();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  if (accounts.some((account) => account.normalizedUsername === normalizedUsername)) {
    throw new Error("That username is already registered on this device.");
  }
  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("That email is already registered on this device.");
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordHash = await derivePasswordHash(password, salt);
  accounts.push({
    username: username.trim(),
    normalizedUsername,
    email: normalizedEmail,
    salt: encodeBytes(salt),
    passwordHash,
  });
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export const loginLocalAccount = async ({ username, password }) => {
  const normalizedUsername = username.trim().toLowerCase();
  const account = readAccounts().find(
    (candidate) => candidate.normalizedUsername === normalizedUsername,
  );

  if (!account) throw new Error("No local account matches that username.");

  const passwordHash = await derivePasswordHash(password, decodeBytes(account.salt));
  if (passwordHash !== account.passwordHash) {
    throw new Error("The password you entered is incorrect.");
  }

  const session = { authenticated: true, username: account.username };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
};

export const clearLocalSession = () => localStorage.removeItem(SESSION_KEY);
