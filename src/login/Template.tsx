import { CustomTemplateProps } from './types'
const Template = (props: CustomTemplateProps<"login.ftl">) => {
  const { children } = props

  return (
    <div>
      {children}
    </div>
  )
}

export { Template }