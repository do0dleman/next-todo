import { NextMiddleware } from "next/server";
export type WithMiddleware = (middleware: NextMiddleware) => NextMiddleware;