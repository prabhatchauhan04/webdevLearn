const murgi = require('./murgiBirth');

let andaBirthPlace = 'Africa';

// module.exports = {
//     anda: 'I am anda',
//     andaBirthPlace,
//     murgi
// }

module.exports.anda = 'I am anda';
module.exports.andaBirthPlace = andaBirthPlace;
module.exports.murgi = murgi;

/*
Why this export style matters
By writing:
module.exports.anda = 'I am anda';
module.exports.andaBirthPlace = andaBirthPlace;
module.exports.murgi = murgi;

you’re adding properties to module.exports one by one.

So even if the file is partially loaded,
Node can still pass around a reference to the same module.exports object,
and any later changes (like adding properties) will update it everywhere it’s referenced.

That’s why this style can reduce problems with circular dependencies compared to exporting an object all at once.
*/
