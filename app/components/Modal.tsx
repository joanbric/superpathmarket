import { Modal, ModalBody, ModalHeader } from 'flowbite-react'

export default function ModalComponent({
  titleHeader,
  children,
  show,
  closeModal,
  onSubmit
}: {
  titleHeader: string
  children: React.ReactNode
  show: boolean
  closeModal: () => void
  onSubmit: () => void
}) {
  return (
    <Modal
      show={show}
      onClose={closeModal}
      onSubmit={onSubmit}
    >
      <ModalHeader>{titleHeader}</ModalHeader>
      <ModalBody>{children}</ModalBody>

    </Modal>
  )
}
