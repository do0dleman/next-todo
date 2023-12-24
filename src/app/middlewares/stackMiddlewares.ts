import { NextMiddleware, NextResponse } from "next/server";
import { WithMiddleware } from "./_withMiddlewareType";

export function stackMiddlewares(
    functions: WithMiddleware[] = [],
    index = 0
): NextMiddleware {
    const current = functions[index];
    if (current) {
        const next = stackMiddlewares(functions, index + 1);
        return current(next);
    }
    return () => NextResponse.next();
}