import Route from '@ember/routing/route';
import Book from '../models/book';
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';

export default Route.extend({
  model() {
    let book = new Book();
    book.set('bits', new ArrayProxy({
      content: A(['one', 'two', 'three']),
    }));

    return book;
  }
});
