import Component from '@ember/component';
import layout from '../templates/components/foo-widget';
import { observer } from '@ember/object';

export default Component.extend({
  layout,

  chapterCountΔ: 0,
  bitsCountΔ: 0,

  incrementChapterCountΔ: observer('book.chapterCount', function incrementChapterCountΔ() {
    this.incrementProperty('chapterCountΔ');
  }),

  incrementbitsCountΔ: observer('book.bitsCount', function incrementbitsCountΔ() {
    this.incrementProperty('bitsCountΔ');
  }),

  actions: {
    addBits() {
      this.book.get('bits').pushObjects(['three', 'four', 'five']);
    }
  }
});
