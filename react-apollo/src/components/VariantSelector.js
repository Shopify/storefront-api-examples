import React from 'react';

const VariantSelector = (props) => {
  const {
    option : {
      name,
      values,
    },
    handleOptionChange,
  } = props;

  return (
    <select
      className="Product__option"
      name={name}
      key={name}
      onChange={handleOptionChange}
    >
      {(values && values.length > 0) && values.map((value) => {
        return (
          <option value={value} key={`${name}-${value}`}>
            {`${value}`}
          </option>
        )
      })}
    </select>
  );
}

export default VariantSelector;
