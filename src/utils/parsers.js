export const parseToReal = (price) => {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const parseCondoAddress = (condo) => {
  const {
    zipcode,
    street,
    building,
    core,
    block,
    neighborhood,
    city,
    state,
  } = condo

  return `${street}, ${building} - Bloco ${block}${
    core ? ` | N${core}` : ''
  } - ${neighborhood} - ${city}/${state}`
}

export const parseToSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
