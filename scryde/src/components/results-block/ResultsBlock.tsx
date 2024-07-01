import { useMemo } from "react";
import formatPrice from "../../utils/formatPrice";
import "./ResultsBlock.css";

export type Result = {
  regularScrolls: number;
  blessScrolls: number;
  ancientScrolls: number;
  destructionScrolls: number;
  itemsUsed: number;
  agathionsUsed: number;
  moneyUsed: number;
};

type Props = {
  currentResult: Result | null;
  previousResult: Result | null;
  type: "regular" | "safe";
};

const ResultsBlock: React.FC<Props> = (props) => {
  const { currentResult, previousResult, type } = props;

  const priceIncrease = useMemo(() => {
    if (!currentResult?.moneyUsed || !previousResult?.moneyUsed) return null;

    const differencePercents =
      (currentResult.moneyUsed / previousResult.moneyUsed - 1) * 100;
    const rounded = Math.round(differencePercents * 100) / 100;

    return `${rounded > 0 ? "+" : ""}${rounded}%`;
  }, [currentResult?.moneyUsed, previousResult?.moneyUsed]);

  const positiveIncrease = useMemo(() => {
    if (!priceIncrease) return false;
    return /\+/.test(priceIncrease);
  }, [priceIncrease]);

  return (
    <>
      <h3>Results ({type}):</h3>
      {(currentResult?.regularScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Scrolls: </label>
          <span>{currentResult?.regularScrolls ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.blessScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Bless Scrolls: </label>
          <span>{currentResult?.blessScrolls ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.itemsUsed ?? 0) > 0 ? (
        <p className="row">
          <label>Items: </label>
          <span>{currentResult?.itemsUsed ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.agathionsUsed ?? 0) > 0 ? (
        <p className="row">
          <label>Agathions: </label>
          <span>{currentResult?.agathionsUsed ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.ancientScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Ancient scrolls: </label>
          <span>{currentResult?.ancientScrolls ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.destructionScrolls ?? 0) > 0 ? (
        <p className="row">
          <label>Destruction scrolls: </label>
          <span>{currentResult?.destructionScrolls ?? ""}</span>
        </p>
      ) : null}
      {(currentResult?.moneyUsed ?? 0) > 0 ? (
        <p className="row">
          <label>Total spent: </label>
          <div>
            <span>
              {currentResult?.moneyUsed
                ? formatPrice(currentResult.moneyUsed)
                : ""}
            </span>
            {priceIncrease !== null ? (
              <span
                style={{
                  marginLeft: 10,
                  color: positiveIncrease ? "red" : "green",
                }}
              >
                {priceIncrease}
              </span>
            ) : null}
          </div>
        </p>
      ) : null}
    </>
  );
};

export default ResultsBlock;
