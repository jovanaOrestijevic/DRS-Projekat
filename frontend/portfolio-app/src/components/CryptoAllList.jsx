import CryptoAll from "./CryptoAll.jsx";

export default function CryptoAllList({ cryptoList }) {
  return (
    <div>
      {cryptoList.map((currency, index) => (
        <CryptoAll currency={currency} key={index} />
      ))}
    </div>
  );
};

