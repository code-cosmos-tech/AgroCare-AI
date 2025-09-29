const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (err) {
        const error = {
            status: 400,
            message: err.errors[0].message
        };
        next(error);
    }
}

module.exports = validate;