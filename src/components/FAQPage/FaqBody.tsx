'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Container from '../shared/Container'

type Faq = {
  question: string
  answer: string
  isOpen: boolean
}

interface FaqBodyProps {
  faqs: Faq[]
}

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-10 w-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)

const MinusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-10 w-10 text-[#E6A206]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)

export default function FaqBody({ faqs }: FaqBodyProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [heights, setHeights] = useState<number[]>([])

  const refs = useRef<HTMLDivElement[]>([])
  console.log('refs', faqs)

  useEffect(() => {
    setHeights(refs.current.map((ref) => ref?.scrollHeight || 0))
  }, [faqs])

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <Container>
      <div className="w-full rounded-2xl py-28 flex flex-col gap-y-4 mt-[-11rem] md:mt-0 mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`flex flex-col gap-y-2.5 px-6 md:py-10 py-10 border-2 rounded-lg transition-colors duration-300 ${faq?.isOpen ? '' : 'hidden'} ${
              openIndex === index
                ? 'border-[#E6A206] bg-[#FDF8ED]'
                : 'border-transparent bg-white shadow-md'
            }`}
          >
            <h2 className="flex justify-between items-start gap-x-2">
              <span className="md:text-[33px] text-[16px] font-Roboto">
                {faq.question}
              </span>
              <button onClick={() => toggleFaq(index)}>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                </motion.div>
              </button>
            </h2>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? heights[index] : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              ref={(el) => {
                if (el) refs.current[index] = el
              }}
            >
              <p className="text-[14px] text-gray-500">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </Container>
  )
}
