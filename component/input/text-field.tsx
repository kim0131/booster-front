interface IPropsTextField {
  type?: string;
  value?: string;
  name?: string;
  placeholder: string;
  maxLength: number;
  isInvalid?: boolean;
  invalidMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextField = ({
  type,
  value,
  name,
  placeholder,
  maxLength,
  isInvalid,
  invalidMessage,
  onChange,
  onFocus,
}: IPropsTextField) => {
  return (
    <div
      className=""
      css={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "50px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        type={type || "text"}
        css={{
          appearance: "none",
          border: `1px solid ${isInvalid || invalidMessage ? "red" : "gray"}`,
        }}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        onFocus={onFocus}
      />
      {invalidMessage && <div className="text-red-500">{invalidMessage}</div>}
    </div>
  );
};

export default TextField;
