import { CustomTemplateProps } from './types'
const Template = <T extends string>(props: CustomTemplateProps<T>) => {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}

export { Template }