import EmberObject from '@ember/object';
import { alias } from '@ember/object/computed';

export default EmberObject.extend({
  chapters: alias('bits'),
  chapterCount: alias('chapters.length'),
  bitsCount: alias('bits.length'),
});
