export const parseToReal = (price) => {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const parseCondoAddress = (condo, apartment) => {
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

  if (apartment) {
    return [
      `Residente no Endereço ${street}, ${building} - Apto ${apartment} ${
        block ? `- Bloco ${block} ` : ''
      }${core ? `| N${core} ` : ''}`,
      `${neighborhood} - ${city}/${state} - ${zipcode}`,
    ]
  }

  return `${street}, ${building}${block ? ` - Bloco ${block}` : ''}${
    core ? ` | N${core}` : ''
  } - ${neighborhood} - ${city}/${state}`
}

export const parseToSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}
