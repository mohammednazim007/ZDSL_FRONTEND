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

const DownloadModal = ({ item }: any) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
      fontSize: 12,
    },
    section: {
      marginBottom: 20,
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    tableContainer: {
      marginTop: 10,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: '1px solid #ddd',
      paddingVertical: 5,
    },
    tableCell: {
      flex: 1,
      textAlign: 'left',
      paddingHorizontal: 5,
    },
    headerCell: {
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
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
    >
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}> {item?.projectId?.projectTitle}</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>Amount</Text>
              <Text style={[styles.tableCell, styles.headerCell]}>
                Due Payment
              </Text>
              <Text style={[styles.tableCell, styles.headerCell]}>
                Deadline
              </Text>
            </View>

            {item?.installmentSetup?.installments.map((installment: any) => (
              <View key={installment._id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{installment?.name}</Text>
                <Text style={styles.tableCell}>{installment?.amount}</Text>
                <Text style={styles.tableCell}>{installment?.duePayment}</Text>
                <Text style={styles.tableCell}>
                  {new Date(
                    parseInt(installment.deadline)
                  ).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default DownloadModal
