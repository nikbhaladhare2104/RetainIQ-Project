
import VariantColumn from './VariantColumn';

const Row = ({ list, row, onAddVariant, onRemoveRow, onRemoveVariant }) => {
  return (
    <div className="flex w-full ">
          <div className="w-[40%] flex flex-shrink-0">
            <div className="w-[33%] ">{ " "}</div>
            <div className="w-[66%] flex items-center justify-center border-r-[1px] border-r-gray-200">Product Filter</div>
          </div>
          <div className="w-[60%] overflow-x-auto overscroll-hidden overflow-hidden">
            <div className="flex">
              <div className="w-[200px] flex justify-between flex-shrink-0 px-4">
                  Primary Variant 
                  <img src="/menu.png" alt="" className="w-[20px]" />
                </div>
              <div className="w-[200px] flex justify-between flex-shrink-0 px-4">
                  Variant 2
                  <img src="/menu.png" alt="" className="w-[20px]" />
                </div>
              {list && list.map((row, index) => (
                <div className="w-[200px] flex justify-between flex-shrink-0 px-4">
                  Variant {row.id + 2}
                  <img src="/menu.png" alt="" className="w-[20px]" />
                </div>
              ))}

            </div>

          </div>
        </div>
  );
};

export default Row;
