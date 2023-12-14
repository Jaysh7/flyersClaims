import { Modal } from "antd";

const ModalComponent = ({
  modalOpen,
  onOk,
  footerVisible,
  onClose,
  children,
  modalTitle,
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
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
