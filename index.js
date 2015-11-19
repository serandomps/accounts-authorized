var dust = require('dust')();
var serand = require('serand');

dust.loadSource(dust.compile(require('./template'), 'accounts-authorized'));

module.exports = function (sandbox, fn, options) {
    var user = options.user;
    user.expires = user.expires - new Date().getTime();
    dust.render('accounts-authorized', options, function (err, out) {
        if (err) {
            return;
        }
        sandbox.append(out);
        fn(false, function () {
            $('.accounts-authorized', sandbox).remove();
        });
    });
};