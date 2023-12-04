export default function CryptoAll({ currency }) {
  return (
    <div>
      <div className="movements__row">
        <div className="movements__type movements__type--deposit">
          {currency.symbol}
        </div>
        <div className="movements__value">{currency.price.toFixed(3)}$</div>
      </div>
    </div>
  );
};

