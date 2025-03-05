// 'use client'

// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
// } from '@react-pdf/renderer'
// import { useEffect, useState } from 'react'
// const DownloadModalAgreement = ({ item }: any) => {
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0,
//   })
//   const styles = StyleSheet.create({
//     page: {
//       padding: 30,
//       fontFamily: 'Helvetica',
//       fontSize: 12,
//     },
//     section: {
//       marginBottom: 20,
//     },
//     heading: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     tableContainer: {
//       marginTop: 10,
//     },
//     tableRow: {
//       flexDirection: 'row',
//       borderBottom: '1px solid #ddd',
//       paddingVertical: 5,
//     },
//     tableCell: {
//       flex: 1,
//       textAlign: 'left',
//       paddingHorizontal: 5,
//     },
//     headerCell: {
//       fontWeight: 'bold',
//       backgroundColor: '#f2f2f2',
//     },
//   })
//   console.log('   download modal item ', item)
//   useEffect(() => {
//     if (typeof window != 'undefined') {
//       const handleResize = () => {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         })
//       }
//       window.addEventListener('resize', handleResize)
//       handleResize()
//       return () => window.removeEventListener('resize', handleResize)
//     }
//   }, [])
//   return (
//     <PDFViewer
//       width={windowSize.width > 768 ? 750 : 400}
//       height={windowSize.height > 768 ? 850 : 400}
//     >
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.section}>
//             <Text style={styles.heading}> {item?.projectId?.projectTitle}</Text>
//           </View>
//           <View style={styles.tableContainer}>
//             <View style={styles.tableRow}>
//               <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
//               <Text style={[styles.tableCell, styles.headerCell]}>Amount</Text>
//               <Text style={[styles.tableCell, styles.headerCell]}>
//                 Due Payment
//               </Text>
//               <Text style={[styles.tableCell, styles.headerCell]}>
//                 Deadline
//               </Text>
//             </View>

//             {item?.installmentSetup?.installments.map((installment: any) => (
//               <View key={installment._id} style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{installment?.name}</Text>
//                 <Text style={styles.tableCell}>{installment?.amount}</Text>
//                 <Text style={styles.tableCell}>{installment?.duePayment}</Text>
//                 <Text style={styles.tableCell}>
//                   {new Date(
//                     parseInt(installment.deadline)
//                   ).toLocaleDateString()}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>

//   )
// }

// export default DownloadModalAgreement

'use client'

import React, { useEffect, useState } from 'react'
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'

type ProjectFeature = {
  name: string | null
  __typename: string
}

type Installment = {
  _id: string
  name: string
  amount: string
  duePayment: string
  deadline: string
}

type ProjectId = {
  projectTitle: string
  aboutProject: string
  expectedStartDate: string
  expectedHandoverDate: string
  projectFeatures: ProjectFeature[]
  __typename: string
}

type ItemType = {
  projectId: ProjectId
  installmentSetup?: {
    installments: Installment[]
  }
}

type ProjectPDFViewerProps = {
  item: ItemType
}

const styles = StyleSheet.create({
  page: {
    // padding: 30,
    // fontFamily: 'Helvetica',
    // fontSize: 12,
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
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

const ProjectPDFViewer: React.FC<ProjectPDFViewerProps> = ({ item }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
            <Text style={styles.heading}>{item.projectId.projectTitle}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>
              <strong>About Project:</strong> {item.projectId.aboutProject}
            </Text>
            <Text style={styles.text}>
              <strong>Expected Start Date:</strong>{' '}
              {new Date(
                Number(item.projectId.expectedStartDate)
              ).toLocaleDateString()}
            </Text>
            <Text style={styles.text}>
              <strong>Expected Handover Date:</strong>{' '}
              {new Date(
                Number(item.projectId.expectedHandoverDate)
              ).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Project Features</Text>
            {item.projectId.projectFeatures.map((feature, index) => (
              <Text key={index} style={styles.text}>
                {feature.name || 'Feature not specified'}
              </Text>
            ))}
          </View>
          {item.installmentSetup?.installments && (
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
                <Text style={[styles.tableCell, styles.headerCell]}>
                  Amount
                </Text>
                <Text style={[styles.tableCell, styles.headerCell]}>
                  Due Payment
                </Text>
                <Text style={[styles.tableCell, styles.headerCell]}>
                  Deadline
                </Text>
              </View>
              {item.installmentSetup.installments.map((installment) => (
                <View key={installment._id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{installment.name}</Text>
                  <Text style={styles.tableCell}>{installment.amount}</Text>
                  <Text style={styles.tableCell}>{installment.duePayment}</Text>
                  <Text style={styles.tableCell}>
                    {new Date(
                      parseInt(installment.deadline)
                    ).toLocaleDateString()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ProjectPDFViewer
