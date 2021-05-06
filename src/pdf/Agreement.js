import React from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

const Letter = ({ today, title, resident, address, price }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        Porto Alegre, {today}
      </Text>
      <Text style={styles.person}>Ilmo(a). Sr.(a) {resident}</Text>
      <Text style={styles.person}>Residente no Endereço {address}</Text>
      <Text style={styles.debt}>Ref. Débito do Condomínio XYZ</Text>
      <Text style={styles.debt}>Período em atraso: 5 meses</Text>
      <Text style={styles.debt}>Valor: {price}</Text>

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
    fontSize: 12,
    textAlign: 'left',
  },
  debt: {
    fontSize: 12,
    textAlign: 'right',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
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
