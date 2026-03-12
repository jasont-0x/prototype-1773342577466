const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference(prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.render('start')
})

router.get('/child-age', function (req, res) {
  res.render('child-age', { errors: null, data: req.session.data })
})

router.post('/child-age', function (req, res) {
  const answer = req.session.data['child-age']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-age', {
      errors: { 'child-age': 'Select yes if your child is in reception, year 1 or year 2' },
      data: req.session.data
    })
  }
  if (answer === 'yes') {
    return res.redirect('/ineligible-child-age')
  }
  res.redirect('/receive-benefits')
})

router.get('/ineligible-child-age', function (req, res) {
  res.render('ineligible-child-age')
})

router.get('/receive-benefits', function (req, res) {
  res.render('receive-benefits', { errors: null, data: req.session.data })
})

router.post('/receive-benefits', function (req, res) {
  const answer = req.session.data['receive-benefits']
  if (!answer || !answer.toString().trim()) {
    return res.render('receive-benefits', {
      errors: { 'receive-benefits': 'Select yes if you receive any benefits or tax credits' },
      data: req.session.data
    })
  }
  res.redirect('/parent-name')
})

router.get('/parent-name', function (req, res) {
  res.render('parent-name', { errors: null, data: req.session.data })
})

router.post('/parent-name', function (req, res) {
  const answer = req.session.data['parent-name']
  if (!answer || !answer.toString().trim()) {
    return res.render('parent-name', {
      errors: { 'parent-name': 'Enter your full name' },
      data: req.session.data
    })
  }
  res.redirect('/national-insurance')
})

router.get('/national-insurance', function (req, res) {
  res.render('national-insurance', { errors: null, data: req.session.data })
})

router.post('/national-insurance', function (req, res) {
  const answer = req.session.data['national-insurance']
  if (!answer || !answer.toString().trim()) {
    return res.render('national-insurance', {
      errors: { 'national-insurance': 'Enter your National Insurance number' },
      data: req.session.data
    })
  }
  res.redirect('/child-name')
})

router.get('/child-name', function (req, res) {
  res.render('child-name', { errors: null, data: req.session.data })
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    return res.render('child-name', {
      errors: { 'child-name': 'Enter your child\'s full name' },
      data: req.session.data
    })
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers', { data: req.session.data })
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', { data: req.session.data })
})

module.exports = router
