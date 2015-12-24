var moment = require('moment');

module.exports = {
    title: 'Hi, I\'m Juan Orozco!',
    documentTitle: 'Juan Orozco',
    headShot: {
      url: 'http://www.gravatar.com/avatar/62e9c31601866b733dfa5c92e81dec5b.png'
    },
    markdown: 'index.md',
    owner: 'Juan Orozco',
    getCurrentYear: function () {
      return moment(this._meta.today).format('YYYY');
    }
}
