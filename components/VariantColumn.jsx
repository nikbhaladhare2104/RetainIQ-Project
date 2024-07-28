// components/VariantColumn.js
const VariantColumn = ({ index, rowId, onRemoveVariant }) => {
  return (
    <div className="border px-4 py-2 w-40">
      <div className="flex items-center">
        <span>Variant {index + 1}</span>
        <button onClick={() => onRemoveVariant(rowId, index)} className="ml-auto text-red-500">🗑️</button>
      </div>
    </div>
  );
};

export default VariantColumn;
