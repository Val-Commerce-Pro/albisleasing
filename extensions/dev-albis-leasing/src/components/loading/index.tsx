const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-[128px] w-[128px] border-t-4 border-b-4 border-blue-500"></div>
          <div className="mt-[16px] text-lg font-semibold">Loading...</div>
        </div>
      </div>
    </>
  );
};
export default Loading;
