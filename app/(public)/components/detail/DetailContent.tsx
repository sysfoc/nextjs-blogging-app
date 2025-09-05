import React from 'react'

interface Props {
  blogDetail: string
}
const DetailContent = ({ blogDetail }: Props) => {
  return (
    <div>
      <div className='prose dark:prose-invert post-content' dangerouslySetInnerHTML={{ __html: blogDetail }} />
    </div>
  )
}

export default DetailContent