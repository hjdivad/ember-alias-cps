import Component from '@ember/component';
import layout from '../templates/components/foo-widget';
import { observer } from '@ember/object';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default Component.extend({
  layout,

  // alias
  chapterCountΔ: 0,
  bitsCountΔ: 0,

  // alias CP
  acpChapterCountΔ: 0,
  acpBitsCountΔ: 0,

  incrementChapterCountΔ: observer('book.chapterCount', function incrementChapterCountΔ() {
    this.incrementProperty('chapterCountΔ');
  }),

  incrementbitsCountΔ: observer('book.bitsCount', function incrementbitsCountΔ() {
    this.incrementProperty('bitsCountΔ');
  }),

  incrementAcpacpChapterCountΔ: observer('book.acpChapterCount', function incrementAcpacpChapterCountΔ() {
    this.incrementProperty('acpChapterCountΔ');
  }),

  incrementAcpBitsCountΔ: observer('book.acpBitsCount', function incrementAcpBitsCountΔ() {
    this.incrementProperty('acpBitsCountΔ');
  }),

  actions: {
    addBits() {
      this.book.get('chapters').pushObjects(['three', 'four', 'five']);
    },

    reset() {
      this.set('book.bits', new ArrayProxy({
        content: A(['one', 'two', 'three'])
      }));
    }
  }
});
