"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleFilter = ({ options, paramKey, type = "multiple" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Convert current values into a Set for easy toggling
  const currentValues = new Set(searchParams.get(paramKey)?.split(",") || []);

  const handleToggle = (value) => {
    const newValues = new Set(currentValues);

    if (newValues.has(value)) {
      newValues.delete(value); // Remove value if already selected
    } else {
      newValues.add(value); // Add value if not selected
    }

    // Clone search params to avoid mutation issues
    const params = new URLSearchParams(searchParams.toString());

    if (newValues.size > 0) {
      params.set(paramKey, Array.from(newValues).join(",")); // Update the param
    } else {
      params.delete(paramKey); // Remove if empty
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ToggleGroup type={type} className="flex justify-start p-1 gap-2">
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={`rounded-xl border ${currentValues.has(option.value) ? "bg-gray-300" : ""
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
