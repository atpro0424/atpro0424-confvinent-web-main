// PDFViewer.js
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { Modal, Button, InputNumber, Space } from "antd";
import { FilePdfOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import "./PDFViewer.scss";

const PDFViewer = ({ pdfUrl }) => {
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [open, setOpen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const zoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const zoomOut = () => {
    setScale((prevScale) => prevScale - 0.1);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <div>
      <Button type="primary" icon={<FilePdfOutlined />} onClick={showModal}>
        View PDF
      </Button>
      <Modal
        title="PDF Viewer"
        open={open}
        onCancel={handleCancel}
        width={800}
        footer={[
          
          <Button key="approve" type="primary" loading={loading} onClick={handleOk}>
            Approve
          </Button>,
          <Button
            key="decline"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Decline
          </Button>,
        ]}
        bodyStyle={{ maxHeight: "80vh", overflow: "auto" }}
        
      >
        <Space className="toolbar">
          <Button onClick={zoomOut} icon={<ZoomOutOutlined />} />
          <Button onClick={zoomIn} icon={<ZoomInOutlined />} />
          <InputNumber
            min={1}
            max={numPages}
            value={pageNumber}
            onChange={(value) => setPageNumber(value)}
          />
          <span>of {numPages || "--"}</span>
          <Button onClick={previousPage} disabled={pageNumber <= 1}>
            Previous
          </Button>
          <Button onClick={nextPage} disabled={pageNumber >= numPages}>
            Next
          </Button>
        </Space>
        <div className="pdf-container">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading...</div>}
            error={<div>Error: Could not load the PDF file.</div>}
          >
            <Page pageNumber={pageNumber} scale={scale} renderTextLayer={false} className="pdf-page"/>
          </Document>
        </div>
      </Modal>
    </div>
  );
};

export default PDFViewer;
