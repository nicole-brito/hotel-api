const paginationSortingMiddleware = () => {
    return(req, res, next) => {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const offset = (page - 1) * limit;

        const sort = req.query.sort ? req.query.sort : "ASC";
        const sortby = req.query.sortby;

        let pagination = {
            offset,
            limit,
        };

        if (sortby && sort) {
            pagination.order = [[sortby, sort]];
        }

        req.pagination = pagination;
        next();
    };
};

export default paginationSortingMiddleware;