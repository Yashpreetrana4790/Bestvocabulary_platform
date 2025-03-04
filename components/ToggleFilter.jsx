"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleFilter = ({ options, paramKey, type = "multiple" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  // Ensure paramKey is fetching the right values
  const currentValues = new Set(params.get(paramKey)?.split(",") || []);

  const handleButtonClick = (value) => {
    const updatedValues = new Set(currentValues);

    if (updatedValues.has(value)) {
      updatedValues.delete(value);
    } else {
      updatedValues.add(value);
    }

    // Update query parameters correctly
    if (updatedValues.size > 0) {
      params.set(paramKey, Array.from(updatedValues).join(",")); // Correct category grouping
    } else {
      params.delete(paramKey);
    }

    // Ensure URL is correctly structured
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ToggleGroup type={type} className="flex justify-start p-1 gap-2">
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={`rounded-xl border ${currentValues.has(option.value) ? "bg-gray-300 font-bold" : ""
            }`}
          onClick={() => handleButtonClick(option.value)}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleFilter;
