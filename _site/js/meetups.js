window.moment.locale('es')
var meetupKey = '314b436b254339547641532331f1865'

function getGroup(groupId) {
  var url = 'https://api.meetup.com/2/events?key='+meetupKey+'&group_id='+groupId+'&sign=1'
  return Promise.resolve(
    $.ajax(url, { dataType: 'jsonp'})
  ).then(function(data) {
    return data.results
  })
}

var groups = {
  16677602: '/images/chela-js-logo.png',
  17761162: '/images/logo-angular-mx.png',
  17481062: '/images/logo-noders.png',
  15625742: '/images/nodebotsmx-logo.png'
}

var tpl = _.template($('#template').html())

function prepareData (events) {
  return _.map(events, function(event) {
    event.image = groups[event.group.id]
    event.time = moment(event.time).format('LL')
    return event
  })
}

function templates (events) {
  return _.map(events, tpl)
}

Promise.all(_.map(_.keys(groups), getGroup))
  .then(_.flatten)
  .then(prepareData)
  .then(templates)
  .then(function (templates) {
    $('#events-container').append(templates.join(''))
  })