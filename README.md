ember-alias-cps
==============================================================================

The `alias`, `readOnly` and `oneWay` macros from `@ember/object/comptued` look
like computed properties, but are actually alias properties.  

The difference in semantics is that alias properties are always `volatile` which means
  - they're not cached and
  - they are sometimes recomputed eagerly
  - they are eagerly set up and don't have to be requested before observers will fire

Alias properties are eagerly evaluated during chain invalidation.  For an
example of this, see
[tests/dummy/app/components/foo-widget](https://github.com/hjdivad/ember-alias-cps/blob/master/tests/dummy/app/components/foo-widget.js)
and note that `bookThing` and `altBookThing` will be recomputed at different
times, the former eagerly and the latter only during rendering.

If you rely on observers firing on alias properties without them being
requested, you will want alias semantics.  Otherwise you will likely prefer CP
semantics.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-alias-cps
```


Usage
------------------------------------------------------------------------------


```js
import { alias, readOnly, oneWay } from 'ember-alias-cps';

// these macros work the same as their equivalents from
// '@ember/object/computed' except that they're CPs and have CP semantics rather
// than alias semantics
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
