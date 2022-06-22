import { SearchCryptoResponseData } from "./types";
import styles from "./Autocomplete.module.css";
import Highlight from "../Highlight";

const Suggestion: React.FC<
  SearchCryptoResponseData & { searchTerm: string }
> = ({ name, priceUsd, symbol, explorer, searchTerm }) => {
  if (name && searchTerm && symbol) {
    return (
      <a href={explorer} target="__blank" className={styles.suggestion}>
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
      </a>
    );
  } else {
    return null;
  }
};

export default Suggestion;
