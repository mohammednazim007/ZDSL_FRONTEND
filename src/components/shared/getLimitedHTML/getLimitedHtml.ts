const getLimitedHtml = (html: string, wordLimit: number): string => {
  // Collapse multiple <br> tags into a single <br>
  html = html.replace(/(<br\s*\/?>\s*){2,}/g, '<br>')

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html // Parse the HTML string
  let wordCount = 0
  let truncatedHtml = ''

  const traverseNodes = (node: ChildNode): void => {
    if (wordCount >= wordLimit) return

    if (node.nodeType === Node.TEXT_NODE) {
      // Process text nodes
      const text = node.textContent || ''
      const words = text.split(/\s+/)
      if (wordCount + words.length > wordLimit) {
        const remainingWords = wordLimit - wordCount
        truncatedHtml += words.slice(0, remainingWords).join(' ')
        wordCount = wordLimit
      } else {
        truncatedHtml += text
        wordCount += words.length
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Process element nodes while preserving HTML tags
      const element = node as HTMLElement
      truncatedHtml += `<${element.tagName.toLowerCase()}>`
      for (const child of node.childNodes) {
        traverseNodes(child)
        if (wordCount >= wordLimit) break
      }
      truncatedHtml += `</${element.tagName.toLowerCase()}>`
    }
  }

  for (const child of tempDiv.childNodes) {
    traverseNodes(child)
    if (wordCount >= wordLimit) break
  }

  return truncatedHtml
}

export default getLimitedHtml
