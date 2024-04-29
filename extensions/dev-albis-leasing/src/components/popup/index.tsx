type PopupProps = { isOpen: boolean; onClose: () => void };

export const Popup = ({ isOpen, onClose }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Modal Title
        </h3>
        <p className="text-gray-600 mb-4">
          Here's some random text inside the modal to show as content.
        </p>
        <button
          onClick={onClose}
          className="py-2 px-4 bg-red-500 hover:bg-red-700 rounded text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};
