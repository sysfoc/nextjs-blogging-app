import React from "react";

interface Props {
  newsDetail: string;
}
const DetailContent = ({ newsDetail }: Props) => {
  return (
    <div>
      <div
        className='prose dark:prose-invert post-content'
        dangerouslySetInnerHTML={{ __html: newsDetail }}
      />
    </div>
  );
};

export default DetailContent;
