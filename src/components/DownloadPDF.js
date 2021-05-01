import React from 'react'

import { PDFDownloadLink } from '@react-pdf/renderer'
import Letter from 'src/pdf/Letter'

export default function DownloadPDF({ children, ...rest }) {
  return (
    <PDFDownloadLink document={<Letter {...rest} />} fileName="letter.pdf">
      {children}
    </PDFDownloadLink>
  )
}
