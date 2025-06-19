import Select from "react-select";
import type { SingleValue } from "react-select";
import countries from "world-countries";

export type CountryOption = {
  label: string;
  value: string;
  flag: string;
  callingCode: string;
};

type Props = {
  value: CountryOption | null;
  onChange: (value: CountryOption) => void;
  name?: string;
  error?: { message?: string };
  isReadOnly?: boolean;
  className?: string;
};

const formattedCountries: CountryOption[] = countries.map(country => ({
  label: country.cca2,
  value: country.cca2,
  flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
  callingCode: country.idd.root + (country.idd.suffixes?.[0] || ""),
}));

const CountrySelect = ({
  value,
  onChange,
  name,
  error,
  isReadOnly,
  className,
}: Props) => {
  const selected =
    formattedCountries.find(c => c.value === value?.value) || null;

  const handleChange = (selectedOption: SingleValue<CountryOption>) => {
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className={className}>
      <Select
        name={name}
        value={selected}
        options={formattedCountries}
        onChange={handleChange}
        isSearchable
        isDisabled={isReadOnly}
        classNamePrefix="country-select"
        formatOptionLabel={(option: CountryOption) => (
          <div className="flex items-center gap-2">
            <img
              src={option.flag}
              alt={option.label}
              className="w-6 h-4 object-cover rounded-sm"
            />
            <span>{option.label}</span>
          </div>
        )}
        styles={{
          control: base => ({
            ...base,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            minHeight: "auto",
            height: "auto",
            padding: 0,
          }),
          dropdownIndicator: base => ({
            ...base,
            padding: 4,
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          valueContainer: base => ({
            ...base,
            padding: 0,
          }),
          input: base => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
        }}
      />
      {error?.message && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default CountrySelect;
