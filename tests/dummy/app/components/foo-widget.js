import Component from '@ember/component';
import layout from '../templates/components/foo-widget';
import { action, observes } from '@ember-decorators/object';

export default class FooWidget extends Component {
  constructor(props) {
    super(props);

    this.chapterCountΔ = 0;
    this.bitsCountΔ = 0;
  }

  @observes('book.chapterCount')
  incrementChapterCountΔ() {
    this.incrementProperty('chapterCountΔ');
  }

  @observes('book.chapterCount')
  incrementBitsCountΔ() {
    this.incrementProperty('bitsCountΔ');
  }

  @action
  addBits() {
    this.book.get('bits').pushObjects(['three', 'four', 'five']);
  }
}

FooWidget.reopenClass({
  layout,
});
