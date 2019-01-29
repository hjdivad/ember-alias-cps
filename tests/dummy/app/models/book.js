import EmberObject from '@ember/object';
import { alias } from '@ember-decorators/object/computed';

export default class Book extends EmberObject {
  @alias('bits') chapters;
  @alias('chapters.length') chapterCount;
  @alias('bits.length') bitsCount;
}
