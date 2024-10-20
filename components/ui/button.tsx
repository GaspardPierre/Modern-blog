import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300",
        destructive: "bg-teal-700 text-white hover:bg-teal-800 focus:ring-red-300",
        outline: "border border-primary-300 bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-300",
        secondary: "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-300",
        accent: "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-300",
        ghost: "bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-300",
        link: "bg-transparent text-primary-500 underline-offset-4 hover:underline focus:ring-primary-300",
        success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-300",
        info: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
        borderless: "bg-transparent text-primary-500 hover:text-primary-600 hover:bg-transparent focus:ring-white  border-none shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }