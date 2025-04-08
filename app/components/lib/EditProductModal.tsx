'use client'
import { Button, FileInput, Label, ModalFooter, TextInput } from 'flowbite-react'
import ModalComponent from '../Modal'
import { createProduct } from '@/actions'
import { useState } from 'react'
import { PlusIcon, SaveIcon, XCircle } from 'lucide-react'

export default function EditProductModal({
  operationType
}: {
  operationType: 'create' | 'edit'
}) {
  const [imagePreview, setImagePreview] = useState<string>('')
  const [showModal, setShowModal] = useState(false)

  if (!showModal && imagePreview !== '') {
    setImagePreview('')
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Button
        onClick={() => {
          setShowModal(true)
        }}
        className="flex font-bold gap-2 items-center"
      >
        <PlusIcon /> Create product
      </Button>
      <ModalComponent
        show={showModal}
        titleHeader={operationType === 'create' ? 'New Product' : 'Edit [product name]'}
        closeModal={closeModal}
        onSubmit={() => {}}
      >
        <form
          action={createProduct}
          onSubmit={closeModal}
          className="space-y-4"
        >
          <div className="flex items-center justify-center my-3 w-full">
            <Label
              htmlFor="dropzone-file"
              className="w-full"
            >
              {!imagePreview ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:border-gray-500 flex flex-col h-64 hover:bg-gray-100 items-center justify-center pb-6 pt-5 rounded-lg">
                  <svg
                    className="dark:text-gray-400 h-8 mb-4 text-gray-500 w-8"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="dark:text-gray-400 mb-2 text-gray-500 text-sm">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="dark:text-gray-400 text-gray-500 text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              ) : (
                <img
                  src={imagePreview}
                  alt=""
                />
              )}
              <FileInput
                id="dropzone-file"
                className="hidden"
                name="image"
                onChange={e => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                }}
              />
            </Label>
          </div>
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            placeholder="Sugar"
            name="name"
            required
          />
          <ModalFooter>
            <Button
              color="red"
              onClick={closeModal}
              className="flex font-bold gap-2 items-center"
              outline
            >
              <XCircle className="w-5" /> Cancel
            </Button>
            <Button
              type="submit"
              className="flex font-bold gap-2 items-center"
            >
              <SaveIcon className="w-5" /> Save
            </Button>
          </ModalFooter>
        </form>
      </ModalComponent>
    </>
  )
}
