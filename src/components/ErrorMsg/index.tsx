import { ErrorMsgIcon } from "../../assets/icons";
import { Button } from "antd";

const ErrorMsg = ({ handleCloseModal }: any) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <ErrorMsgIcon />
      <p className="text-3xl font-semibold text-black">Error</p>
      <p className="text-[#989898] font-medium text-lg">
        Your bill has not been submitted.
      </p>
      <Button
        onClick={handleCloseModal}
        className="bg-[#7700C7] px-5 py-4 flex items-center text-white text-base font-semibold"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorMsg;
