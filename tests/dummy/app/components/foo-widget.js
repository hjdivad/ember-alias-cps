import Component from '@ember/component';
import layout from '../templates/components/foo-widget';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { alias as aliasCp } from 'ember-alias-cps';

let i=0;

export default Component.extend({
  layout,

  authorName: computed('book.author', function () {
    return this.get('book.author');
  }),

  writerName: computed('altBook.author', function () {
    return this.get('altBook.author');
  }),

  book: alias('bookThing'),
  altBook: aliasCp('altBookThing'),


  bookThing: computed('bookData', function () {
    // during pingBook this is *eagerly* fetched during the property change
    // event for `book`, due to eager chain revalidation as alias is volatile
    return this.get('bookData');
  }),
  altBookThing: computed('altBookData', function () {
    // during pingAltBook() this is retrieved during re-rendering, as expected
    return this.get('altBookData');
  }),

  bookData: null,
  altBookData: null,

  actions: {
    pingBook() {
      this.set('bookData', {
        author: `Das Author ${++i}`,
      });
    },

    pingAltBook() {
      this.set('altBookData', {
        author: `Das AltBook Author ${++i}`,
      });
    }
  }
});
