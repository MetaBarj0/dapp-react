type Props = {
  errorMessage: string
};

const ErrorMessage = (props: Props) => {
  return (
    <div className="border-solid border-2 rounded-md p-1 border-gray-500 col-span-2">
      {/* TODO: clear button for the error message */}

      <label className="mb-4 block w-auto text-center">Latest error message</label>
      <label className="text-red-500 block pt-4">{props.errorMessage}</label>
    </div>
  )
};

export default ErrorMessage;
