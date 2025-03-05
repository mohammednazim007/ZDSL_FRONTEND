/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

import { useEffect, useState } from 'react'

const DownloadModalBooking = ({ item }: any) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
    },
    section: {
      marginBottom: 10,
      padding: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subHeading: {
      fontSize: 14,
      fontWeight: 'semibold',
      marginBottom: 5,
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
    divider: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      marginVertical: 10,
    },
  })
  console.log('   download modal item ', item)
  useEffect(() => {
    if (typeof window != 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <PDFViewer
      width={windowSize.width > 768 ? 750 : 400}
      height={windowSize.height > 768 ? 850 : 400}
      className="w-full h-svh"
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>{item?.projectId?.projectTitle}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              <strong>Agreement Date:</strong>{' '}
              {new Date(Number(item.agreementDate)).toLocaleDateString()}
            </Text>
          </View>
          {item?.agreementTemplates?.pages?.map((page: any, index: string) => (
            <View key={index} style={styles.section}>
              <Text style={styles.heading}>{page.pageTitle}</Text>
              <Text style={styles.text}>{page.content.header}</Text>
              <Text style={styles.text}>{page.content.body}</Text>
              <View style={styles.divider}></View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default DownloadModalBooking
