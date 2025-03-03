"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleFilter = ({ options, paramKey, type = "multiple" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current values from URL and split them into an array
  const currentValues = new Set(searchParams.get(paramKey)?.split(",") || []);

  // Handle toggling of filters
  const handleToggle = (value) => {
    const newValues = new Set(currentValues);

    if (newValues.has(value)) {
      newValues.delete(value); 
    } else {
      newValues.add(value); 
    }

    // Update the URL
    const params = new URLSearchParams(searchParams);
    if (newValues.size > 0) {
      params.set(paramKey, Array.from(newValues).join(",")); 
    } else {
      params.delete(paramKey);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ToggleGroup type={type} className="flex justify-start p-1 gap-2">
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={`rounded-xl border ${
            currentValues.has(option.value) ? "bg-gray-300" : ""
          }`}
          onClick={() => handleToggle(option.value)}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleFilter;
