import { render } from '@testing-library/react'
import { toCapitalCase } from './SearchPanel'
import SearchPanel from './SearchPanel'
import moment from 'moment'


test('SearchPanel renders', () => {
  const props = {
    products: [],
    data: {
      product: '',
      country: 'DE',
      begin: moment(),
      end: moment()
    },
    handleSelectOnChange: () => {},
    handleDatePickerOnChange:  () => {}
  }
  render(<SearchPanel {...props} />);
});

it('should capitalize string', () => {
  expect(toCapitalCase('test')).toBe('Test')
})