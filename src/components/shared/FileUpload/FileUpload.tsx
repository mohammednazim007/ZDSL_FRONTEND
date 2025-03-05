import React, { useEffect, useState } from 'react'
import Image from 'next/image' // Import for handling the upload.svg

interface FileUploadProps {
  onChange: (files: File[]) => void // Function to update files in the form
  existingFiles?: File[] // Optional existing files for preview
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  existingFiles = [],
}) => {
  const [filePreviews, setFilePreviews] = useState<File[]>(existingFiles)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files)
      setFilePreviews((prev) => [...prev, ...newFiles])
      onChange([...filePreviews, ...newFiles]) // Update the parent form
    }
  }

  // const removeFile = (fileToRemove: File) => {
  //   const updatedFiles = filePreviews.filter((file) => file !== fileToRemove)
  //   setFilePreviews(updatedFiles)
  //   onChange(updatedFiles) // Update the parent form
  // }

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = filePreviews.filter((file) => file !== fileToRemove)
    setFilePreviews(updatedFiles)
    onChange(updatedFiles) // Update the parent form
    URL.revokeObjectURL(URL.createObjectURL(fileToRemove)) // Revoke object URL to free up memory
  }

  useEffect(() => {
    return () => {
      // Cleanup any object URLs to avoid memory leaks
      filePreviews.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      )
    }
  }, [filePreviews])

  // console.log(filePreviews, '============file ')

  return (
    <div className="">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center bg-white p-4 border-2 border-[#dee4e8] rounded-lg border-dashed "
      >
        {/* Upload Icon */}
        <div className=" flex space-x-2 items-center text-sm">
          <div className="">
            <Image src="/upload.svg" alt="Upload" width={20} height={30} />
          </div>
          <div>
            <p className="text-gray-500">
              Drag and drop file or{' '}
              <span className="text-green-500 font-semibold">Browse</span>
            </p>
            <p className="text-xs text-gray-400">
              Support file jpeg, jpg, png, gif, svg
            </p>
          </div>
        </div>
      </label>

      {/* Preview section */}
      <div className="flex mt-4 space-x-4 overflow-x-auto">
        {filePreviews.map((file, index) => (
          <div key={index} className="relative w-24 h-24">
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              width={50}
              height={70}
              className="object-cover rounded-[10px] w-[97px] h-[90px] "
            />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-500 rounded-xl"></div>
            {/* Remove button */}
            <button
              onClick={() => removeFile(file)}
              className="absolute top-0 right-0 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center border border-gray-300 shadow-md"
            >
              &times;
            </button>
            {/* Progress bar style */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload
