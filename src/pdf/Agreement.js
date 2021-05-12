import React from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

const Letter = ({
  today,
  title,
  condo,
  resident,
  address,
  price,
  dueDate,
  dueDay,
  times,
  month,
}) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.title} fixed>
        ACORDO EXTRAJUDICIAL
      </Text>
      <Text style={styles.text}>
        As partes, de um lado, como credor, {condo}, representado por seu
        advogado, Dr. Alexandre Marcelo de Castro, OAB/RS 69.632, e de outro,
        como condômino, o sr. {resident} , acordam o que segue referente às
        cotas condominiais em atraso do imóvel situado na {address}:
      </Text>
      <Text style={styles.text}>
        1. O condômino reconhece o débito, no valor de {price}, calculados até o
        dia {title}, que se refere às cotas condominiais vencidas entre os meses
        de {dueDate}, do imóvel supra, que foram acrescidas de correção
        monetária pelo IGP-M/FGV, juros de mora, além da multa e honorários
        advocatícios.
      </Text>
      <Text style={styles.text}>
        2. As partes acordam, em caráter excepcional, que o pagamento será
        efetuado em {times} prestações mensais, fixas e consecutivas, cada uma
        no valor de {price}, vencendo a primeira no dia {dueDay}, e as demais,
        sucessivamente nos mesmos dias dos meses subsequentes, todas realizadas
        através de transferência bancária ao Itaú, ag. 6319, conta 25.310-7, de
        titularidade de Alemcastro Assessoria Imobiliária, CNPJ
        31.023.469/0001-70, servindo os comprovantes de depósito/transferência
        como recibos de pagamento.
      </Text>
      <Text style={styles.text}>
        3. Estabelecem as partes que o atraso no pagamento de quaisquer das
        parcelas, seja por qual motivo for, acarretará no vencimento antecipado
        da dívida, que será recalculada, acrescida de multa, correção monetária
        pelo IGP-M/FGV, juros legais e honorários advocatícios, desde a data do
        vencimento até o efetivo pagamento, bem como na tomada das medidas
        judiciais cabíveis, inclusive com o pedido imediato de execução dos
        valores aqui reconhecidos, acrescidos ainda dos meses vincendos não
        pagos.
      </Text>
      <Text style={styles.text}>
        4. O condômino declara estar ciente de que o presente débito compreende
        a quitação das cotas condominiais até o mês de {month}, comprometendo-se
        pois, em pagar concomitantemente as cotas condominiais que vencerão a
        partir de {2}, nas datas de seus vencimentos, sob pena de rescisão do
        presente acordo, com o consequente ingresso de ação noticiada acima.
      </Text>
      <Text style={styles.text}>
        5. No caso do credor precisar recorrer à Justiça para cobrar seus
        direitos, ficará o condômino devedor também das custas judiciais e
        honorários sucumbenciais.
      </Text>
      <Text style={styles.text}>
        6. Elegem as partes o Foro de Porto Alegre para dirimir quaisquer
        dúvidas oriundas da presente transação.
      </Text>
      <Text style={styles.date}>Porto Alegre, {today}</Text>
      <Text style={styles.signature}>_______________________</Text>
      <Text style={styles.signature}>_______________________</Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Página ${pageNumber} de ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
  },
  title: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
  },
  date: {
    textAlign: 'left',
    fontSize: 12,
    margin: 12,
  },
  signature: {
    textAlign: 'left',
    fontSize: 12,
    marginLeft: 12,
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})

export default Letter