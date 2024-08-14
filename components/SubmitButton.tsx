import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, loadingText = 'Chargement...', className }) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? loadingText : children}
    </Button>
  )
}

export default SubmitButton