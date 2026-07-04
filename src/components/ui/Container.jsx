import { cn } from '../../utils/cn'

export function Container({ as: Tag = 'div', className, children }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1200px] px-4 sm:px-8', className)}>{children}</Tag>
  )
}

export function Section({ as: Tag = 'section', className, children, ...props }) {
  return (
    <Tag className={cn('py-10 sm:py-[50px]', className)} {...props}>
      {children}
    </Tag>
  )
}
