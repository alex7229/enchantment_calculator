import formatPrice from "../../utils/formatPrice";
import "./ResultsBlock.css";

type Result = {
  regularScrolls: number;
  blessScrolls: number;
  itemsUsed: number;
  agathionsUsed: number;
  moneyUsed: number;
};

type Props = {
  result: Result | null;
  type: "regular" | "safe";
};

const ResultsBlock: React.FC<Props> = (props) => {
  const { result, type } = props;
  return (
    <div style={{ width: 280 }}>
      <h3>Results ({type}):</h3>
      {(result?.regularScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Scrolls: </label>
          <span>{result?.regularScrolls ?? ""}</span>
        </p>
      ) : null}
      {(result?.blessScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Bless Scrolls: </label>
          <span>{result?.blessScrolls ?? ""}</span>
        </p>
      ) : null}
      {(result?.itemsUsed ?? 0) > 0 ? (
        <p className="row">
          <label>Items: </label>
          <span>{result?.itemsUsed ?? ""}</span>
        </p>
      ) : null}
      {(result?.moneyUsed ?? 0) > 0 ? (
        <p className="row">
          <label>Total spent: </label>
          <span>{result?.moneyUsed ? formatPrice(result.moneyUsed) : ""}</span>
        </p>
      ) : null}
    </div>
  );
};

export default ResultsBlock;
