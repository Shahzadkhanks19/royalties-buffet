export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function notFoundHandler(req, _res, next) {
  next(new ApiError(404, `API route not found: ${req.method} ${req.originalUrl}`));
}

export function errorHandler(error, _req, res, _next) {
  if (error?.name === "ValidationError") {
    const details = Object.values(error.errors || {}).map((item) => item.message);
    return res.status(400).json({ ok: false, message: "Validation failed.", details });
  }

  if (error?.code === 11000) {
    return res.status(409).json({ ok: false, message: "A matching record already exists." });
  }

  const status = Number(error?.status) || 500;
  const message = status >= 500 ? "Something went wrong on the server." : error.message;

  if (status >= 500) console.error(error);

  return res.status(status).json({
    ok: false,
    message,
    ...(error?.details ? { details: error.details } : {}),
  });
}
