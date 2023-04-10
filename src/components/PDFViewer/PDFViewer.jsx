import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { FloatButton } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const backPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  const forwardPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div>
      <Document 
        file={{
          url,
          withCredentials: true,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          height={750}
        />
      </Document>
      <FloatButton onClick={backPage} icon={<LeftOutlined />} style={{ right: 455 }} />
      <FloatButton style={{ right: 405 }} description={`${pageNumber} / ${numPages}`} />
      <FloatButton onClick={forwardPage} icon={<RightOutlined />} style={{ right: 355 }} />
    </div>
  );
};

export default PDFViewer;
