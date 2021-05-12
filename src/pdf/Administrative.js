import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const Letter = ({ today, title, condo, resident, address, price }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        Porto Alegre, {today}
      </Text>
      <View style={styles.person}>
        <Text>Ilmo(a). Sr.(a) {resident}</Text>
        <Text>Residente no Endereço {address}</Text>
      </View>
      <View style={styles.debt}>
        <Text>Ref. Débito do {condo}</Text>
        <Text>Período em atraso: {title}</Text>
        <Text>Valor: {price}</Text>
      </View>
      <Text style={styles.text}>Prezado(a) Senhor(a):</Text>
      <Text style={styles.text}>
        Na qualidade de advogado e procurador de MILCOR ASSESSORIA IMOBILIÁRIA,
        venho através da presente, para informar a V. Sa., que se encontra em
        nosso escritório, o procedimento de cobrança relativo ao débito indicado
        acima.
      </Text>
      <Text style={styles.text}>
        Outrossim, esclareço que o referido pagamento deverá ser feito
        diretamente em nosso escritório, sito à Av Assis Brasil, 418, sala 305,
        Santa Maria Goretti Porto Alegre, RS, no prazo improrrogável de 24
        (vinte e quatro) horas, a contar do recebimento desta, para o pagamento
        do débito referido, vencido e não pago até a presente data, de sua
        responsabilidade.
      </Text>
      <Text style={styles.text}>
        Lembro a V. Sa., que o não pagamento do débito em questão no prazo acima
        implicará na propositura das medidas judiciais cabíveis.
      </Text>
      <Text style={styles.text}>
        Contando com sua compreensão e providência no sentido de evitar maiores
        transtornos, ao ensejo, subscrevo-me, sendo que, em caso de V. Sa. já
        ter efetuado o pagamento supra, pedimos o favor de desconsiderar a
        presente correspondência.
      </Text>
      <Text style={styles.text}>Atenciosamente,</Text>
      <Text style={styles.signature}>_______________________</Text>
      <Text style={styles.signature}>Dptº Jurídico</Text>
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
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    color: 'grey',
  },
  person: {
    width: '100%',
    margin: 12,
    fontSize: 10,
    textAlign: 'left',
  },
  debt: {
    width: '100%',
    margin: 12,
    fontSize: 12,
    textAlign: 'right',
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
  },
  signature: {
    marginLeft: 12,
    marginTop: 4,
    fontSize: 12,
    textAlign: 'left',
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
