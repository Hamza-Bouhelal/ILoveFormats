export const Error = ({ message }: { message: string }) => {
  return (
    <div className="px-6 py-4 rounded-md my-12 text-center max-w-md mx-auto">
      <p className="text-9xl rotate-90">{":("}</p>
      <p className="text-3xl font-bold mt-12">{message}</p>
    </div>
  );
};
