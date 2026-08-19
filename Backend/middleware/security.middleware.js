import crypto from "node:crypto";

const base64url = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (data) =>
  crypto
    .createHmac("sha256", process.env.JWT_SECRET || "change-this-secret")
    .update(data)
    .digest("base64url");

export const createAuthToken = (user) => {
  const header = base64url({ alg: "HS256", typ: "JWT" });
  const payload = base64url({
    id: user._id.toString(),
    email: user.email,
    fullname: user.fullname,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });
  const signature = sign(`${header}.${payload}`);

  return `${header}.${payload}.${signature}`;
};

const verifyAuthToken = (token) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) return null;
  if (sign(`${header}.${payload}`) !== signature) return null;

  const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) return null;

  return decoded;
};

export const requireClientKey = (req, res, next) => {
  const expectedKey = process.env.APP_CLIENT_KEY;

  if (!expectedKey) return next();

  const receivedKey = req.get("x-bookstore-client");
  if (receivedKey !== expectedKey) {
    return res.status(403).json({ message: "Unauthorized client" });
  }

  next();
};

export const requireAuth = (req, res, next) => {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  const user = token ? verifyAuthToken(token) : null;

  if (!user) {
    return res.status(401).json({ message: "Login required" });
  }

  req.user = user;
  next();
};

export const requireAdmin = (req, res, next) => {
  const adminEmails = (process.env.ADMIN_EMAILS || "alokuc123@gmail.com")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (!adminEmails.includes(req.user?.email?.toLowerCase())) {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
