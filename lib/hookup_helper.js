var moment = require('moment');

(function() {
  var qIndex, ranges;

  module.exports.hookup = function(els, query, from, to, rangeMode) {
    var _this = this;
    if (from == null) {
      from = "fromDate";
    }
    if (to == null) {
      to = "toDate";
    }
    if (rangeMode == null) {
      rangeMode = "default";
    }
    return els.daterangepicker({
      format: 'YYYY-MM-DD',
      startDate: moment(query.get(from)).format("yyyy-mm-dd"),
      endDate: moment(query.get(to)).format("yyyy-mm-dd"),
      ranges: ranges[rangeMode]
    }, function(start, finish) {
      query.set(from, start.startOf('day').toDate());
      return query.set(to, finish.startOf('day').toDate());
    });
  };

  qIndex = new Date().getMonth() % 3;

  ranges = {
    "default": {
      'Yesterday': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
      'Last 7 Days': [moment().subtract('days', 6).startOf('day'), moment().endOf('day')],
      'Last 30 Days': [moment().subtract('days', 29).startOf('day'), moment().endOf('day')],
      'This Month': [moment().startOf('month').startOf('day'), moment().endOf('month').endOf('day')],
      'Last Month': [moment().subtract('month', 1).startOf('month').startOf('day'), moment().subtract('month', 1).endOf('month').endOf('day')],
      'This Quarter': [moment().subtract('month', qIndex).startOf('month').startOf('day'), moment().add('month', 2 - qIndex).endOf('month').endOf('day')],
      'Last Quarter': [moment().subtract('month', qIndex + 3).startOf('month').startOf('day'), moment().add('month', -1 - qIndex).endOf('month').endOf('day')]
    },
    ages: {
      'Born in 80\'s': [moment("01 01 1980").startOf('day'), moment("12 31 1989").endOf('day')],
      'Born in 90\'s': [moment("01 01 1990").startOf('day'), moment("12 31 1999").endOf('day')],
      'Under 30': [moment().subtract('years', 30).startOf('day'), moment().endOf('day')],
      'Senior Citizen': [moment("01 01 1900").startOf('day'), moment().subtract('years', 65).endOf('day')]
    }
  };

}).call(this);
