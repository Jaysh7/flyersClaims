import { useState } from "react";
import { Modal } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalComponent = ({ modalOpen, onOk, onClose }: any) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        open={modalOpen}
        onOk={onOk}
        onCancel={onClose}
      >
        <p className="text-red-700">Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalComponent;