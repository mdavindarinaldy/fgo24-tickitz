import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

function nowDate() {
    let now = moment().format('ddd, DD-MMM-YYYY')
    let tomorrow = moment().add(1,'days').format('ddd, DD-MMM-YYYY')
    let dayAfterTomorrow = moment().add(2,'days').format('ddd, DD-MMM-YYYY')
    return [now, tomorrow, dayAfterTomorrow]
}

export default nowDate()