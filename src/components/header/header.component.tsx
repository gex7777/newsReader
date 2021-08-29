import "./header.styles.css";
import { SearchBar } from "./searchbar/searchbar.component";
import { FormDialog } from "./dialog/dialog.component";
interface props {
  searchValue?: any;
  advancedSearchQuery?: any;
}

export const Header: React.FC<props> = ({
  searchValue,
  advancedSearchQuery,
}) => {
  const callback = (value: string) => {
    searchValue(value);
  };
  const advancedSearch = (value: any) => {
    advancedSearchQuery(value);
  };
  return (
    <>
      <div className="navcontainer">
        <div className="logo">
          News<span>Reader</span>
        </div>
        <SearchBar searchValue={callback} />

        <FormDialog callback={advancedSearch} />
      </div>
    </>
  );
};
