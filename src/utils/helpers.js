import moment from 'moment'

export const calculateNextBirthdays = (condos) => {
  const birthdays = condos.map((condo) => {
    const { id, name, initial_date } = condo

    const initial = moment(initial_date).format('YYYY-MM-DD')
    const numberOfYears = moment().diff(initial, 'years')

    const bdays = [...Array(numberOfYears + 3)].map((x, i) => {
      return {
        id: `birthday C${id}-Y${i}`,
        type: 'birthdays',
        title: `Aniversário de Síndico`,
        start: moment(initial_date).add(i, 'y').format('YYYY-MM-DD'),
        description: `Aniversário de ${i} anos no ${name}`,
        condo_id: id,
      }
    })

    const preBdays = [...Array(numberOfYears + 3)].map((x, i) => {
      return {
        id: `prebirthday C${id}-Y${i}`,
        type: 'birthdays',
        title: `Pré Aniversário de Síndico`,
        start: moment(initial_date)
          .add(i, 'y')
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
        description: `1 mês para aniversário de ${i} anos no ${name}`,
        condo_id: id,
      }
    })

    return [...bdays, ...preBdays]
  })

  return birthdays.flat()
}

export const debtCalculator = () => {}
