/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";

const ModalComponent = ({
  modalOpen,
  onOk,
  footerVisible,
  onClose,
  children,
  modalTitle,
  closeIcon,
}: any) => {
  return (
    <>
      <Modal
        title={modalTitle}
        width={600}
        centered
        open={modalOpen}
        footer={footerVisible}
        onOk={onOk}
        onCancel={onClose}
        closeIcon={closeIcon}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
