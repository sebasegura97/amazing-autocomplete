import { SearchCryptoResponseData } from "./types";
import styles from "./Autocomplete.module.css";
import Highlight from "../Highlight";

const Suggestion: React.FC<
  SearchCryptoResponseData & {
    searchTerm: string;
    active: boolean;
    onSelect: (name: string, id: string) => void;
  }
> = (props) => {
  const { name, priceUsd, symbol, searchTerm, onSelect, active, id } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name && id) {
      onSelect(name, id);
    }
  };

  if (name && searchTerm && symbol) {
    return (
      <button
        onClick={handleClick}
        className={styles.suggestion}
        style={{
          border: active ? "2px solid green" : "2px solid transparent",
          borderBottom: active ? '2px solid green' : '1px solid #CCC',
          borderRadius: 8
        }}
      >
        <span className={styles.suggestionTitle}>
          <strong>
            <Highlight highlight={searchTerm} text={name} />{" "}
          </strong>
          $<Highlight highlight={searchTerm} text={symbol} />
        </span>
        <span>
          {" "}
          U$D <strong>{Number(priceUsd).toLocaleString()}</strong>{" "}
        </span>
      </button>
    );
  } else {
    return null;
  }
};

export default Suggestion;
