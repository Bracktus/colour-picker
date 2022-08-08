export interface TextBoxInputProps {
  text: string;
  onTextChange: (newText: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}

export const TextBoxInput: React.FC<TextBoxInputProps> = ({
  text,
  onTextChange,
  onBlur,
  onFocus,
}) => {
  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputText = e.target.value.replace(/[^0-9,\s]/g, "");
    onTextChange(inputText);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleTextChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default TextBoxInput;
