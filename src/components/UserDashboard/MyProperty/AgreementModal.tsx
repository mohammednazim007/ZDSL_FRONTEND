import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { TAgreementTemplate } from './propertyType'
 
const AgreementModal = ({ agreementTemplates }: any) => {
  // Create styles
  const styles = StyleSheet.create({
    page: { padding: 10 },
    section: { padding: 15, marginBottom: 5 },
    text: { marginBottom: 5 },
  })
  console.log('text ', agreementTemplates)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {agreementTemplates?.pages?.map((page: any, index: number) => (
          <View style={styles.section} key={index}>
            {page.pageTitle.split('\n').map((line: string, i: number) => (
              <Text key={i} style={styles.text}>
                {line}
              </Text>
            ))}

            {/* Assuming page.content.body is a string, you can split it */}
            {page.content.body.split('\n').map((line: string, i: number) => (
              <Text key={i} style={styles.text}>
                {line}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default AgreementModal
