import { computed, get, set, defineProperty } from '@ember/object';

export default function oneWay(depKey) {
  return computed(depKey, {
    get(/* key */) {
      return get(this, depKey);
    },
    set(key, value) {
      defineProperty(this, key, null);
      return set(this, key, value);
    }
  });
}

