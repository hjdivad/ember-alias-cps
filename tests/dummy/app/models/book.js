import EmberObject from '@ember/object';
import { alias } from '@ember/object/computed';
import { alias as cpAlias } from 'ember-alias-cps';

export default EmberObject.extend({
  // @ember/object/computed.alias
  chapters: alias('bits'),
  chapterCount: alias('chapters.length'),
  bitsCount: alias('bits.length'),

  // ember-alias-cps.alias
  acpChapters: cpAlias('bits'),
  acpChapterCount: cpAlias('acpChapters.length'),
  acpBitsCount: cpAlias('bits.length'),
});
