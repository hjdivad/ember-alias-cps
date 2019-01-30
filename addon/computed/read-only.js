import EmberError from '@ember/error';
import { computed, get } from '@ember/object';

export default function readOnly(depKey) {
  return computed(depKey, {
    get(/* key */) {
      return get(this, depKey);
    },
    set(key /*, value */) {
      throw new EmberError(`Cannot set read-only property '${key}' on object: ${this}`);
    }
  });
}

