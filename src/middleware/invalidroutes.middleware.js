export const invalidRouterMiddleware = (req, res, next) => {
    return res.status(404).send("Invalid route!");
};