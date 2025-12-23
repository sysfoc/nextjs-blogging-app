import React from "react";

interface Props {
  blogsDetail: string;
}
const DetailContent = ({ blogsDetail }: Props) => {
  return (
    <div>
      <div
        className='prose dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-sm max-w-none post-content'
        dangerouslySetInnerHTML={{ __html: blogsDetail }}
      />
    </div>
  );
};

export default DetailContent;