import React from 'react'

interface Props {
  blogDetail: string
}
const DetailContent = ({ blogDetail }: Props) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: blogDetail }} />
    </div>
  )
}

export default DetailContent