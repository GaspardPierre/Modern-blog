import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Création...' : 'Créer le Post'}
    </Button>
  )
}

export default SubmitButton
