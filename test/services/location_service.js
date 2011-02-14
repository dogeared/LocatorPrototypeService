require('../../lib/helpers/test_helper.js');

module.exports = {
  'set a location': function(assert) {
    assert.response(app, {
      url: '/setLocation',
      method: 'POST',
      data: 'name=test&latitude=42.334537&longitude=-71.170101',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { status: 200 }, 
    function(res) { 
      var resObj = JSON.parse(res.body);
      assert.eql(resObj, { result: 'Success', message: 'Set location for test' });
    });
  },
  'get a location: exists': function(assert) {
    assert.response(app, {
      url: '/getLocation',
      method: 'POST',
      data: 'name=test',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { status: 200 },
    function(res) { 
      var resObj = JSON.parse(res.body);
      assert.eql(resObj, { result: 'Success', message: 'Got location for test', latitude: '42.334537', longitude: '-71.170101'});
    });
  },
  'get a location: not exists': function(assert) {
    assert.response(app, {
      url: '/getLocation',
      method: 'POST',
      data: 'name=antitest',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { status: 200 },
    function(res) { 
      var resObj = JSON.parse(res.body);
      assert.eql(resObj, {result: 'Error', message: 'antitest not found'});
    });
  }
}
