const single = async (name: string, file?: File) => {
  if (!file) return
  const formData = new FormData()
  formData.append('dp', file)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MEDIA_UPLOAD_URL}/${name}`,
    {
      method: 'POST',
      body: formData,
    }
  )
  const data = await res.json()
  if (!data?.success) return false

  return data?.file?.[0]?.path || false
}

const uploadFile = {
  single,
}

export default uploadFile
