import moment from 'https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm'

function nowDate() {
    let now = moment().format('YYYY-MM-DD')
    let tomorrow = moment().add(1,'days').format('YYYY-MM-DD')
    let dayAfterTomorrow = moment().add(2,'days').format('YYYY-MM-DD')
    return [now, tomorrow, dayAfterTomorrow]
}

export default nowDate()