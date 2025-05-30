import { Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { ChangeEventHandler } from 'react'

export default function InputComponent(props: { label: string, name: string, type: string, placeholder: string | undefined, changeHandler: ChangeEventHandler<HTMLInputElement>,
  value: any
}) {
  return (
    <div>
      <Field>
        <Label className="mb-1 block text-sm font-medium text-gray-700">{props.label} <span className="text-red-500">*</span></Label>
        <Input value={props.value} name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.changeHandler} className={clsx(
            'form-input w-full py-2',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
          required
        />
      </Field>
    </div>
  )
}
