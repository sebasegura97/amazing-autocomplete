import { ChangeEvent, KeyboardEvent, useMemo, useRef, useState } from "react";
import { debounce } from "../../utils/debounce";
import styles from "./Autocomplete.module.css";
import Suggestion from "./Suggestion";
import { SearchCryptoResponseData } from "./types";

async function searchCrypto<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();

  return body.data;
}

const Autcomplete = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const [suggestions, setSuggestions] = useState<SearchCryptoResponseData[]>(
    []
  );

  const handleAutocompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    searchCrypto<SearchCryptoResponseData[]>(
      `https://api.coincap.io/v2/assets/?search=${e.target.value}&limit=${5}`
    )
      .then((res) => {
        setSuggestions(res);
        setSearchTerm(e.target.value);
      })
      .catch((err) => {
        setSearchError(err.message || "We have an unexpected error, sorry :(");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [debouncedSearch] = useMemo(
    () => debounce(handleAutocompleteChange, 500),
    []
  );

  const handleSelect = (name: string, id: string) => {
    if (searchRef.current?.value) {
      searchRef.current.value = name;
      setSelectedOption(id);
    }
  };

  const renderList = () => {
    if (suggestions.length && searchTerm) {
      return suggestions.map((item) => (
        <Suggestion
          {...item}
          key={item.id}
          searchTerm={searchTerm}
          active={item.id === selectedOption}
          onSelect={handleSelect}
        />
      ));
    }

    if (suggestions.length === 0 && searchTerm.length > 0) {
      return (
        <p className={styles.emptyMessage}>
          No hay resultados para su busqueda{" "}
        </p>
      );
    }

    if (!searchTerm) {
      return (
        <p className={styles.emptyMessage}>Escriba un termino de busqueda </p>
      );
    }

    if (searchError) {
      return <p className={styles.errorMessage}>{searchError}</p>;
    }
  };
  return (
    <div className={styles.container}>
      <form>
        <div className={styles.inputContainer}>
          <input
            autoComplete="disabled"
            name="autocomplete"
            type="text"
            placeholder="Search crypto"
            className={styles.search}
            onChange={debouncedSearch}
            ref={searchRef}
          />
          {loading && <div className={styles.spinner} />}
        </div>
        <datalist id="currencies" className={styles.datalist}>
          {renderList()}
        </datalist>
      </form>
    </div>
  );
};

export default Autcomplete;
