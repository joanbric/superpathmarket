import { Modal, ModalBody, ModalHeader, ModalProps } from 'flowbite-react'
interface ModalComponentProps extends ModalProps {
  titleHeader: string
  children: React.ReactNode
  show: boolean
  closeModal: () => void
  onSubmit: () => void
}

export default function ModalComponent({
  titleHeader,
  children,
  show,
  closeModal,
  onSubmit,
  ...props
}: ModalComponentProps) {
  return (
    <Modal
      show={show}
      onClose={closeModal}
      onSubmit={onSubmit}
      {...props}
    >
      <ModalHeader>{titleHeader}</ModalHeader>
      <ModalBody>{children}</ModalBody>

    </Modal>
  )
}
