import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject, { observer } from '@ember/object';
import { alias, readOnly, oneWay } from 'ember-alias-cps';

module('unit/alias', function(hooks) {
  setupTest(hooks);

  test(`alias semantics`, function(assert) {
    let obj = EmberObject.extend({
      aFoo: alias('foo'),
    }).create();

    obj.set('foo', 1);
    assert.equal(obj.get('foo'), 1, 'obj.get(foo)');
    assert.equal(obj.get('aFoo'), 1, 'obj.get(aFoo)');

    obj.set('aFoo', 2);
    assert.equal(obj.get('foo'), 2, 'obj.get(foo) after set(aFoo)');
    assert.equal(obj.get('aFoo'), 2, 'obj.get(aFoo) after set(aFoo)');

    obj.set('foo', 3);
    assert.equal(obj.get('foo'), 3, 'obj.get(foo) after set(foo)');
    assert.equal(obj.get('aFoo'), 3, 'obj.get(aFoo) after set(foo)');
  });

  test(`readOnly semantics`, function(assert) {
    let obj = EmberObject.extend({
      aFoo: readOnly('foo'),
    }).create();

    obj.set('foo', 1);
    assert.equal(obj.get('foo'), 1, 'obj.get(foo)');
    assert.equal(obj.get('aFoo'), 1, 'obj.get(aFoo)');

    assert.throws(() => {
      obj.set('aFoo', 2);
    }, /Cannot set read-only property 'aFoo' on object:/);

    obj.set('foo', 3);
    assert.equal(obj.get('foo'), 3, 'obj.get(foo) after set(foo)');
    assert.equal(obj.get('aFoo'), 3, 'obj.get(aFoo) after set(foo)');
  });

  test(`oneWay semantics`, function(assert) {
    let obj = EmberObject.extend({
      aFoo: oneWay('foo'),
    }).create();

    obj.set('foo', 1);
    assert.equal(obj.get('foo'), 1, 'obj.get(foo)');
    assert.equal(obj.get('aFoo'), 1, 'obj.get(aFoo)');

    obj.set('foo', 2);
    assert.equal(obj.get('foo'), 2, 'obj.get(foo) after set(foo)');
    assert.equal(obj.get('aFoo'), 2, 'obj.get(aFoo) after set(foo)');

    obj.set('aFoo', 3);
    assert.equal(obj.get('foo'), 2, 'obj.get(foo) after set(aFoo)');
    assert.equal(obj.get('aFoo'), 3, 'obj.get(aFoo) after set(aFoo)');

    obj.set('foo', 4);
    assert.equal(obj.get('foo'), 4, 'obj.get(foo) after disconnected + set(foo)');
    assert.equal(obj.get('aFoo'), 3, 'obj.get(aFoo) after disconnected + set(foo)');
  });


  [alias, readOnly, oneWay].forEach(macro => {
    test(`${macro.name} has cp semantics`, function(assert) {
      let aFooΔ = 0;
      let fooΔ = 0;
      let obj = EmberObject.extend({
        aFoo: macro('foo'),
        fooObserver: observer('foo', () => fooΔ++),
        aFooObserver: observer('aFoo', () => aFooΔ++),
      }).create();

      assert.equal(fooΔ, 0, 'fooObserver calls after create');
      assert.equal(aFooΔ, 0, 'aFooObserver calls after create');

      obj.set('foo', 1);
      assert.equal(fooΔ, 1, 'fooObserver calls after set');
      assert.equal(aFooΔ, 0, 'aFooObserver calls after set');

      assert.equal(obj.get('aFoo'), 1, 'install observer');

      obj.set('foo', 2);
      assert.equal(fooΔ, 2, 'fooObserver calls after install + set');
      assert.equal(aFooΔ, 1, 'aFooObserver calls after install + set');

      obj.set('foo', 3);
      assert.equal(fooΔ, 3, 'fooObserver calls after uninstall + set');
      assert.equal(aFooΔ, 1, 'aFooObserver calls after uninstall + set');
    });
  });
});
