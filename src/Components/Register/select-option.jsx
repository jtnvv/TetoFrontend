import Select from "react-select";
import makeAnimated from 'react-select/animated';

export default function SelectOption({options, setResponse, fieldName, defaultValue = []}) {
  const animatedComponents = makeAnimated();
  const items = [];
  const defaultValues = [];
  const responseName = fieldName;
  let response = {};
  
  for(const option in options){
    const item = options[option];
    items.push({value: item, label: item.toUpperCase()});
  }

  for(const value in defaultValue){
    const item = defaultValue[value];
    defaultValues.push({value: item, label: item.toUpperCase()});
  }
  
  const onChange = (event) => {
    response = {
      [responseName]:event.map(option => option.value)
    }
    setResponse(response);
  };

  return (
    <>
    <Select
      defaultValue={defaultValues}
      placeholder="Selecciona"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={items}
      onChange={onChange}
      styles={{
        control: (styles, state) => ({ ...styles, 
          backgroundColor: '#F1F1F1',
          borderLeft: 0,
          borderTop: 0,
          borderRight: 0,
          borderRadius: 0,
          borderBottomWidth: state.isFocused ? "2px" : "2px",
          borderBottomColor: state.isFocused || state.isSelected ? "#A3A48F" : "#101010",
          outline: state.isFocused ? 0 : 0
        })
      }}
      />
      </>
  )
}
