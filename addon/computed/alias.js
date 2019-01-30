import { computed, get, set } from '@ember/object';

export default function alias(depKey) {
  return computed(depKey, {
    get(/* key */) {
      return get(this, depKey);
    },
    set(key, value) {
      return set(this, depKey, value);
    }
  });
}
