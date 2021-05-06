import React from 'react'
import moment from 'moment'

import { PDFDownloadLink } from '@react-pdf/renderer'

import Agreement from 'src/pdf/Agreement'
import { parseToSlug } from 'src/utils/parsers'

export default function DownloadPDF({ children, ...rest }) {
  return (
    <PDFDownloadLink
      document={<Agreement today={moment().format('LL')} {...rest} />}
      fileName={`${moment().format('YYYY-MM-DD')}-acordo-${parseToSlug(
        rest.resident
      )}.pdf`}
    >
      {children}
    </PDFDownloadLink>
  )
}
