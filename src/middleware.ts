import { stackMiddlewares } from "./app/middlewares/stackMiddlewares";
import { withAuth } from "./app/middlewares/withAuth";

const middlewares = [withAuth]

export default stackMiddlewares(middlewares)

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};