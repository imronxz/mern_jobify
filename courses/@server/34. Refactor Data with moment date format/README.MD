# Refactor Data monthlyApplications with moment date format
```js
//* Refactor Data with moment date format
monthlyApplication = monthlyApplication.map((item) => {
  const { _id: { year, month }, count } = item
  // accept 0 - 11
  const date = moment().month(month - 1).year(year).format('MMMM YY')
  return { date, count}
}).reverse()
```