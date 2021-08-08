import React from 'react'
import * as redux from 'react-redux'
import Enzyme, { mount } from 'enzyme'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import Adapter from 'enzyme-adapter-react-16'
import Comments from '../pages/Comments'

Enzyme.configure({ adapter: new Adapter() })

const mockGetAllComments = jest.fn()
const spyOnUseDispatch = jest.spyOn(redux, 'useDispatch')
const spyOnUseSelector = jest.spyOn(redux, 'useSelector')

jest.spyOn(axios, 'default').mockResolvedValue({
  id: 131981809,
  email: 'testing@user.com',
  body: 'Test Description',
  date: '8/7/2021',
  time: '1:49:10 PM'
})

const mockData = [
  {
    id: 131981809,
    email: 'cong@testing.com',
    body: 'Testing Comment',
    date: '8/7/2021',
    time: '1:49:10 PM'
  },
  {
    id: 131981810,
    email: 'cong1234@testing.com',
    body: 'Testing Description',
    date: '8/7/2021',
    time: '1:55:23 PM'
  }
]

describe('Comments', () => {
  beforeEach(() => {
    spyOnUseDispatch.mockReturnValue(mockGetAllComments)
    spyOnUseSelector
      .mockReturnValueOnce([])
      .mockReturnValueOnce(mockData)
  })

  afterEach(() => {
    cleanup()
    spyOnUseDispatch.mockClear()
    spyOnUseSelector.mockClear()
  })

  it('Should render comments', () => {
    spyOnUseSelector
      .mockReturnValueOnce(mockData)
    const { getByTestId } = render(<Comments />)
    expect(getByTestId('comments')).toBeInTheDocument()
  })

  it('Should render 2 forms', () => {
    const { container } = render(<Comments />)
    const inputCounts = container.querySelectorAll('.form-item')
    expect(inputCounts).toHaveLength(2)
  })

  it('Should render Add Comment Button', () => {
    const { getByTestId } = render(<Comments />)
    expect(getByTestId('comment-add-btn')).toBeInTheDocument()
  })

  it('Should call submit function when the user click Add Comment Button', async () => {
    const wrapper = await mount(<Comments />)
    const addButton = wrapper.find('#comment-add-btn').first()
    const commentInput = wrapper.find('#comment')
    commentInput.simulate('focus')
    commentInput.simulate('change', { target: { value: 'a' } })
    const emailInput = wrapper.find('#email')
    emailInput.simulate('focus')
    emailInput.simulate('change', { target: { value: 'testing@user.com' } })
    expect(addButton.text()).toBe('Add Comment')

    addButton.simulate('click')
    expect(wrapper.find('.error-msg').exists()).toBe(false)
  })

  it('Should show validation error when the user click Add Comment Button with empty email and body', () => {
    const wrapper = mount(<Comments />)
    const addButton = wrapper.find('#comment-add-btn').first()
    const commentInput = wrapper.find('#comment')
    const emailInput = wrapper.find('#email')
    emailInput.simulate('focus')
    emailInput.simulate('change', { target: { value: 'testing@user.com' } })
    expect(addButton.text()).toBe('Add Comment')

    addButton.simulate('click')
    expect(wrapper.find('.error-msg').exists()).toBe(true)
  })
})
