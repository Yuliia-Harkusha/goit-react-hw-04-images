import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Header, Form, Input, SearchButton } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <SearchButton type="submit">
          <FaSearch size={14} />
        </SearchButton>
        <Input
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
