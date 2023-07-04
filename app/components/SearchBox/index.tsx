import style from './SearchBox.module.css';

interface SearchBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBox: React.FC<SearchBoxProps> = ({ ...props }) => {
  return (
    <div className={style.search_box}>
      <input {...props} />
    </div>
  );
};

export default SearchBox;
