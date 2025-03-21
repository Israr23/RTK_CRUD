import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText(/learn/i)).toBeInTheDocument()
})
