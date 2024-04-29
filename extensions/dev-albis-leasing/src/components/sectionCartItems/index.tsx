import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { ShoppingCart, ShoppingCartItem } from "../../types/cartTypes";
import { formatDecimalNumber } from "../../utils/formatValues";
import { Box } from "../box";

type SectionCartItemsProps = {
  cartData: ShoppingCart;
  handleUpdateItemQuantity: (item: ShoppingCartItem, type?: "plus") => void;
  handleDeleteCartItem: (item: ShoppingCartItem) => void;
};

export const SectionCartItems = ({
  cartData,
  handleUpdateItemQuantity,
  handleDeleteCartItem,
}: SectionCartItemsProps) => {
  const tableHeaders = ["Image", "Quantity", "TItle", "Price", "Actions"];
  return (
    <Box title="Artikel aus dem Warenkorb">
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((item, i) => (
                <th
                  key={`${i}-${item}`}
                  scope="col"
                  className="px-[24px] py-[12px] text-left font-medium text-gray-500 uppercase tracking-wider"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cartData.items.map((item, index) => (
              <tr key={index}>
                <td className="px-[24px] py-[16px] whitespace-nowrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[40px] w-[40px] rounded-full"
                  />
                </td>
                <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-900">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleUpdateItemQuantity(item)}
                      className={`p-[4px] mr-[8px] rounded-full border-0 ${
                        item.quantity <= 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateItemQuantity(item, "plus")}
                      className="p-[4px] ml-[8px] rounded-full border-0 text-gray-500 hover:text-gray-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-[24px] py-[16px] font-medium text-gray-900 break-words">
                  {item.title}
                </td>
                <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-500">
                  €{formatDecimalNumber(item.line_price)}
                </td>
                <td className="px-[24px] py-[16px] whitespace-nowrap text-gray-500">
                  <button
                    onClick={() => handleDeleteCartItem(item)}
                    className="p-[4px] rounded-full border-0 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={3}
                className="px-[24px] py-[16px] text-right font-medium text-gray-900"
              >
                Total
              </td>
              <td className="px-[24px] py-[16px] text-gray-500">
                €{formatDecimalNumber(cartData.total_price)}
              </td>
              <td className="px-[24px] py-[16px]"></td>{" "}
              {/* Empty cell for the Actions column */}
            </tr>
          </tbody>
        </table>
      </div>
    </Box>
  );
};
