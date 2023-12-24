import { authMiddleware } from "@clerk/nextjs";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import { WithMiddleware } from "./_withMiddlewareType";

export const withAuth: WithMiddleware = () => {
    return authMiddleware({
        publicRoutes: [
            '/',
            '/api/webhooks/onUserCreate'
        ],
        ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)",
            "/api/webhooks/onUserCreate"]
    })

}

