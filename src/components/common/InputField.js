import React from 'react';

const InputField = (
  {
    onChange,
    onBlurCapture,
    onKeyDown,
    onClick,
    type,
    placeholder,
    value,
    disabled,
    id,
  },
) => (
  <div
    role="presentation"
    style={styles.container}
    onClick={onClick}
    onBlurCapture={onBlurCapture}
    onKeyDown={onKeyDown}
  >
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      style={styles.input}
      id={id}
    />
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flex: 1,
  },
  input: {
    flex: 1,
    maxHeight: 16,
    display: 'flex',
    height: 16,
    borderRadius: 2,
  },
};

export { InputField };
