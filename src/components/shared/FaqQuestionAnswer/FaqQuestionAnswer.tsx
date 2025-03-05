'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

interface FaqQuestionAnswerProps {
  question: string
  id: string
  answer: string
  isOpen: boolean
  toggleAccordion: (id: string) => void
  isVisible: boolean
}

interface AccordionItemProps {
  id: string
  question: string
  isOpen: boolean
  onClick: () => void
  children: React.ReactNode
}

const FaqQuestionAnswer: React.FC<FaqQuestionAnswerProps> = ({
  question,
  id,
  answer,
  isOpen, // Use isOpen from props
  toggleAccordion,
  isVisible,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current)
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`
        contentRef.current.style.opacity = '1'
      } else {
        contentRef.current.style.maxHeight = '0'
        contentRef.current.style.opacity = '0'
      }
  }, [isOpen])

  return (
    <div className={`${isVisible ? '' : 'hidden'} my-1 rounded-md bg-white `}>
      <AccordionItem
        id={id}
        question={question}
        isOpen={isOpen}
        onClick={() => toggleAccordion(id)}
      >
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 px-5"
        >
          <p className="font-poppins text-sm mb-[2rem]">{answer}</p>
        </div>
      </AccordionItem>
    </div>
  )
}

// Define AccordionItem here
const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  question,
  isOpen,
  onClick,
  children,
}) => {
  return (
    <div className="border-2 border-[#D9DFE3] rounded-md">
      <h2 id={id} className="">
        <button
          type="button"
          className="flex relative items-center justify-between w-full px-5 font-medium rounded-t-xl gap-5"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <div className="flex py-[1.375rem] items-center justify-between md:justify-start md:gap-3 w-full">
            <span
              style={{ fontWeight: '500' }}
              className="text-left flex-[2] text-black text-2xl md:flex-none"
            >
              {question}
            </span>
          </div>
          {isOpen ? (
            <Image src="/faq-down.png" alt="faq down" height={40} width={40} />
          ) : (
            <Image src="/faq-up.png" alt="faq up" height={40} width={40} />
          )}
        </button>
      </h2>
      <div
        className={`transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default FaqQuestionAnswer
