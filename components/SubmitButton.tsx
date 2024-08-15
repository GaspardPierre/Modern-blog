import React, { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

interface SubmitButtonProps {
  children: ReactNode;
  loadingText?: string;
  className?: string;
  icon?: ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  children, 
  loadingText = 'Chargement...', 
  className,
  icon
}) => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? loadingText : (
        <>
          {children}
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </Button>
  )
}

export default SubmitButton