import { computed, get } from '@ember/object';

export default function readOnly(depKey) {
  return computed(depKey, {
    get(/* key */) {
      return get(this, depKey);
    }
  }).readOnly();
}

