var createError = require('create-error')

exports.NotFoundError = createError('NotFoundError', {status: 404})
exports.BadRequestError = createError('BadRequestError', {status: 400})
exports.ValidationError = createError('ValidationError', {status: 422})
