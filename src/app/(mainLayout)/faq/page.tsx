'use client'

import FaqBanner from '@/components/FAQPage/FaqBanner'
import FaqBody from '@/components/FAQPage/FaqBody'
import FaqContactNow from '@/components/FAQPage/FaqContactNow'
import ServiceBox from '@/components/shared/DynamicTabs/ServiceBox'
import Loader from '@/components/shared/Loder'
import { gql, useQuery } from '@apollo/client'
import { useState, useMemo } from 'react'

interface IFaq {
  _id: string
  title: string
  visibility: boolean
  faqs: {
    answer: string
    question: string
    isOpen: boolean
  }[]
}

const GET_FAQ_URL = gql`
  query GetFaqs {
    getFaqs {
      success
      message
      data {
        _id
        title
        visibility
        faqs {
          question
          answer
          isOpen
        }
        isDeleted
      }
    }
  }
`

export default function ContactUsPage() {
  const [question, setQuestion] = useState<IFaq[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { loading, error } = useQuery(GET_FAQ_URL, {
    onCompleted: (data) => {
      // Filter data to include only visible categories
      const visibleCategories = data?.getFaqs?.data?.filter(
        (category: IFaq) => category.visibility
      )
      setQuestion(visibleCategories)
      if (visibleCategories?.length > 0) {
        setActiveTab(visibleCategories[0]?.title) // Set the first visible category as active
      }
    },
    onError: (error) => {
      console.error('Error fetching FAQs:', error)
    },
  })

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Filter FAQs based on the search term or active tab
  const filteredFaqs = useMemo(() => {
    if (searchTerm.trim()) {
      // Filter FAQs across all visible categories based on the search term
      return question?.flatMap((category) =>
        category?.faqs?.filter((faq) =>
          faq?.question?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Show FAQs from the active tab
    if (activeTab) {
      return (
        question.find((category) => category.title === activeTab)?.faqs || []
      )
    }

    // Default behavior: Show all FAQs from all visible categories
    return question.flatMap((category) => category.faqs)
  }, [question, activeTab, searchTerm])

  if (loading) return <Loader />

  if (error) {
    return <div>Error: Unable to fetch FAQs. Please try again later.</div>
  }

  return (
    <div className="bg-[#FBFBFB]">
      <FaqBanner onSearchChange={handleSearchChange} />
      <div className="container mx-auto grid-cols-1 gap-5 place-items-center xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-4 px-4 md:px-10 hidden md:grid">
        {question?.map((category) => (
          <ServiceBox
            key={category?._id}
            title={category?.title}
            isVisible={category?.visibility}
            isActive={activeTab === category?.title}
            onClick={() => setActiveTab(category?.title)}
          />
        ))}
      </div>
      <FaqBody faqs={filteredFaqs} />
      <FaqContactNow />
    </div>
  )
}
