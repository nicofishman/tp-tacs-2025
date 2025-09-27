import { Elysia } from "elysia";

// Simple in-memory rate limiter
// In production, you should use Redis or another persistent storage
class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> =
    new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier);

    if (!userRequests || now > userRequests.resetTime) {
      // First request or window has expired
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (userRequests.count >= this.maxRequests) {
      return false;
    }

    userRequests.count++;
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const userRequests = this.requests.get(identifier);
    if (!userRequests || Date.now() > userRequests.resetTime) {
      return this.maxRequests;
    }
    return Math.max(0, this.maxRequests - userRequests.count);
  }

  getResetTime(identifier: string): number {
    const userRequests = this.requests.get(identifier);
    if (!userRequests || Date.now() > userRequests.resetTime) {
      return Date.now() + this.windowMs;
    }
    return userRequests.resetTime;
  }
}

// Different rate limiters for different endpoints
const generalLimiter = new RateLimiter(15 * 60 * 1000, 100); // 100 requests per 15 minutes
const authLimiter = new RateLimiter(15 * 60 * 1000, 10); // 10 auth requests per 15 minutes
const strictAuthLimiter = new RateLimiter(60 * 1000, 3); // 3 login attempts per minute

export const rateLimitMiddleware = new Elysia({ name: "rate-limit" }).derive(
  ({ request, status }) => {
    const getClientIdentifier = (request: Request): string => {
      // Try to get real IP from headers (when behind proxy)
      const xForwardedFor = request.headers.get("x-forwarded-for");
      const xRealIp = request.headers.get("x-real-ip");
      const cfConnectingIp = request.headers.get("cf-connecting-ip");

      if (xForwardedFor) {
        return xForwardedFor.split(",")[0].trim();
      }
      if (xRealIp) {
        return xRealIp;
      }
      if (cfConnectingIp) {
        return cfConnectingIp;
      }

      // Fallback to user-agent + some headers for identification
      const userAgent = request.headers.get("user-agent") || "unknown";
      return `fallback-${userAgent.slice(0, 50)}`;
    };

    return {
      rateLimitCheck: (
        limiterType: "general" | "auth" | "strict-auth" = "general",
      ) => {
        const identifier = getClientIdentifier(request);
        let limiter: RateLimiter;

        switch (limiterType) {
          case "auth":
            limiter = authLimiter;
            break;
          case "strict-auth":
            limiter = strictAuthLimiter;
            break;
          default:
            limiter = generalLimiter;
        }

        if (!limiter.isAllowed(identifier)) {
          const resetTime = limiter.getResetTime(identifier);
          const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

          return status(429, {
            error: "Too Many Requests",
            message: "Rate limit exceeded. Please try again later.",
            retryAfter,
          });
        }

        // Add rate limit headers
        const remaining = limiter.getRemainingRequests(identifier);
        const resetTime = limiter.getResetTime(identifier);

        return {
          headers: {
            "X-RateLimit-Limit": limiter.maxRequests.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": Math.ceil(resetTime / 1000).toString(),
          },
        };
      },
    };
  },
);

// Specific middleware for auth routes
export const authRateLimitMiddleware = new Elysia({ name: "auth-rate-limit" })
  .use(rateLimitMiddleware)
  .derive(({ rateLimitCheck }) => {
    const result = rateLimitCheck("auth");
    if ("error" in result) {
      throw new Error("Rate limit exceeded");
    }
    return result;
  });

// Strict middleware for login/register routes
export const strictAuthRateLimitMiddleware = new Elysia({
  name: "strict-auth-rate-limit",
})
  .use(rateLimitMiddleware)
  .derive(({ rateLimitCheck }) => {
    const result = rateLimitCheck("strict-auth");
    if ("error" in result) {
      throw new Error("Rate limit exceeded");
    }
    return result;
  });
