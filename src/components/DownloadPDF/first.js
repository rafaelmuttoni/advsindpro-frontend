import React from 'react'
import moment from 'moment'

import { PDFDownloadLink } from '@react-pdf/renderer'

import Administrative from 'src/pdf/Administrative'
import { parseToSlug } from 'src/utils/parsers'

export default function DownloadPDF({ children, ...rest }) {
  return (
    <PDFDownloadLink
      document={<Administrative today={moment().format('LL')} {...rest} />}
      fileName={`${moment().format('YYYY-MM-DD')}-atraso-${parseToSlug(
        rest.resident
      )}.pdf`}
    >
      {children}
    </PDFDownloadLink>
  )
}
