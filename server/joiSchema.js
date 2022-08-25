const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.udhariSchema = Joi.object({
    username: Joi.string().required().escapeHTML(),
    email: Joi.string().escapeHTML(),
    contact: Joi.number(),
    upi_id: Joi.string().required().escapeHTML(),
    amount: Joi.number().min(1).required(),
    // status: Joi.string().required().escapeHTML()
})