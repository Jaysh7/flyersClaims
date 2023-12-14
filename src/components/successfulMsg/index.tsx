import { SuccessfullMsgIcon } from "../../assets/icons";
import { Button } from "antd";

const SuccessMsg = ({ handleCloseModal }: any) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <SuccessfullMsgIcon />
      <p className="text-3xl font-semibold text-black">
        Successfully submitted
      </p>
      <p className="text-[#989898] font-medium text-lg">
        Your bill has been claimed successfully
      </p>
      <Button
        onClick={handleCloseModal}
        className="bg-[#7700C7] px-5 py-4 flex items-center text-white text-base font-semibold"
      >
        OK
      </Button>
    </div>
  );
};

export default SuccessMsg;
