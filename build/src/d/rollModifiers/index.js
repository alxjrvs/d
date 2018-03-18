"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var parameters_1 = require("./parameters");
function generateTotal(results, modifier) {
    if (lodash_1.isPlainObject(modifier)) {
        modifier = modifier;
        return parameters_1.default(results, modifier);
    }
    if (lodash_1.isFunction(modifier)) {
        modifier = modifier;
        return modifier(results);
    }
    return lodash_1.sum(results);
}
exports.default = generateTotal;
//# sourceMappingURL=index.js.map