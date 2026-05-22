function parseOriginList(value) {
  if (!value || typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isLocalhostOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

function isVercelOrigin(origin) {
  return /^https:\/\/.*\.vercel\.app$/i.test(origin);
}

function buildCorsOriginChecker() {
  const configuredOrigins = parseOriginList(process.env.FRONTEND_URL);
  const allowedOrigins = new Set(configuredOrigins);

  return (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV !== "production" && isLocalhostOrigin(origin)) {
      return callback(null, true);
    }

    if (process.env.NODE_ENV === "production" && isVercelOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  };
}

module.exports = {
  parseOriginList,
  buildCorsOriginChecker,
};
