import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CardWrapper from '../../common/Card'
import SmallTitle from '../../common/typografy/smallTitle'
import Divider from '../../common/divider'
import TextField from '../../common/form/textField'

const FormComponent = ({ children }) => {
  const [data, setData] = useState({})
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }))
  }

  return React.Children.map(children, (child) => {
    const config = {
      ...child.props,

      onChange: handleChange,
      value: data[child.props.name] || ''
    }
    return React.cloneElement(child, config)
  })
}
FormComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
const Component = ({ number }) => {
  return <div>Компонент списка : {number}</div>
}
const GettingNumberingOrder = ({ children }) => {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      number: index + 1
    })
  })
}

const ReactChildrenExample = () => {
  return (
    <CardWrapper>
      <GettingNumberingOrder>
        <SmallTitle>Clone form and add props</SmallTitle>
        <Divider />
        <FormComponent>
          <TextField name="email" label="email" />
          <TextField name="password" label="password" type="password" />
        </FormComponent>
        <Component />
        <Component />
        <Component />
      </GettingNumberingOrder>
    </CardWrapper>
  )
}

export default ReactChildrenExample
