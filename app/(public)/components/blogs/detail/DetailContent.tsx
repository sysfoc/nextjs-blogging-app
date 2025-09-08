import React from "react";

interface Props {
  blogsDetail: string;
}
const DetailContent = ({ blogsDetail }: Props) => {
  return (
    <div>
      <div
        className='prose dark:prose-invert post-content'
        dangerouslySetInnerHTML={{ __html: blogsDetail }}
      />
    </div>
  );
};

export default DetailContent;
