import React from 'react'
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

const Letter = ({
  user,
  today,
  todayFormatted,
  title,
  condo,
  resident,
  address,
  price,
  priceInFull,
  dueDate,
  times,
  firstQuota,
  restQuota,
  quotaDate,
  dischargeMonth,
  maturingMonth,
}) => (
  <Document>
    <Page style={styles.body}>
      <Image src="/images/logo.png" style={styles.logo} />
      <Text style={styles.title} fixed>
        ACORDO EXTRAJUDICIAL
      </Text>
      <Text style={styles.text}>
        As partes, de um lado, como credor, {condo}, representado por seu
        advogado, {user.name}, OAB/RS {user.oab}, e de outro, como condômino,
        o(a) Sr.(Sra.) {resident}, acordam o que segue referente às cotas
        condominiais em atraso do imóvel situado na {address}:
      </Text>
      <Text style={styles.text}>
        1. O condômino reconhece o débito, no valor de {price} ({priceInFull}),
        calculados até o dia {todayFormatted}, que se refere às cotas
        condominiais vencidas entre os meses de {title}, do imóvel supra, que
        foram acrescidas de correção monetária pelo IGP-M/FGV, juros de mora,
        além da multa e honorários advocatícios.
      </Text>
      <Text style={styles.text}>
        2. As partes acordam, em caráter excepcional, que o pagamento será
        efetuado em {times} prestações mensais e consecutivas, a primeira no
        valor de {firstQuota} vencendo no dia {quotaDate}, e as demais,
        sucessivamente nos mesmos dias dos meses subsequentes no valor de{' '}
        {restQuota}, todas realizadas através do PIX 31.023.469/0001-70 ou
        transferência bancária ao Itaú (341), ag. 6319, conta 25.310-7, de
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
        as cotas condominiais até o mês de {dischargeMonth}, com recalculo ao
        final do parcelamento, comprometendo-se pois, em pagar concomitantemente
        as cotas condominiais que vencerão a partir de {maturingMonth}, nas
        datas de seus vencimentos, sob pena de rescisão do presente acordo, com
        o consequente ingresso de ação noticiada acima.
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
      <View style={styles.signatureContainer}>
        <View style={styles.firstSignature}>
          <Text>_______________________</Text>
          <Text>{condo}</Text>
        </View>

        <View style={styles.secondSignature}>
          <Text>_______________________</Text>
          <Text>{resident}</Text>
        </View>
      </View>

      <Image style={styles.address} src="/images/address.png" fixed />
    </Page>
  </Document>
)

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
  },
  logo: {
    width: '50%',
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 14,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 12,
    textAlign: 'justify',
  },
  date: {
    textAlign: 'left',
    fontSize: 12,
    marginBottom: 20,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },

  firstSignature: {
    fontSize: 12,
    width: '50%',
  },
  secondSignature: {
    fontSize: 12,
    width: '50%',
  },

  address: {
    width: '95%',
    marginHorizontal: 'auto',
    marginTop: 'auto',
  },
})

export default Letter
