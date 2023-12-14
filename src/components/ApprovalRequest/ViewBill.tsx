import { useState } from "react";
import { PdfIcon } from "../../assets/icons";
import { Button } from "antd";

const ViewBill = () => {
  const [openPdf, setOpenPdf] = useState<any>();
  const handleViewPdf = () => {
    setOpenPdf(!openPdf);
  };
  return (
    <div className=" bg-[#EEE] p-3 rounded-lg mb-3">
      <section className="flex justify-between">
        <div className="flex items-center">
          <PdfIcon className="w-8 h-8" />
          <span className="text-sm not-italic font-medium">
            Sample file.pdf
          </span>
        </div>
        <div className="flex">
          <Button
            onClick={handleViewPdf}
            className="border-transparent text-[rgba(119,0,199,1)]  text-base font-semibold
            flex items-center"
          >
            {openPdf ? "Close" : "View"}
          </Button>
          <Button
            className="border-transparent text-[rgba(119,0,199,1)]  text-base font-semibold
           flex items-center"
          >
            Download
          </Button>
        </div>
      </section>
      {openPdf && (
        <section>
          <embed
            src="https://www.africau.edu/images/default/sample.pdf"
            width="500"
            height="375"
            type="application/pdf"
          />
        </section>
      )}
    </div>
  );
};

export default ViewBill;
