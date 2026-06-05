import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useCategoriesQuery } from "../../categories/services/categoriesService";

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Available", value: "available" },
  { label: "Unavailable", value: "unavailable" },
];

export default function BooksFilterBar({
  filters,
  onFilterChange,
}) {
  const { data: categoriesData } = useCategoriesQuery();

  const categories = categoriesData?.data || [];

  const selectedCategory =
    categories.find(
      (category) =>
        String(category.id) === String(filters.category_id)
    ) || null;

  const handleCategoryChange = (_, value) => {
    onFilterChange({
      ...filters,
      category_id: value?.id || "",
    });
  };

  const handleStatusChange = (event) => {
    onFilterChange({
      ...filters,
      status: event.target.value,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category */}

      <Autocomplete
        options={categories}
        value={selectedCategory}
        onChange={handleCategoryChange}
        getOptionLabel={(option) => option?.name || ""}
        isOptionEqualToValue={(option, value) =>
          option.id === value.id
        }
        size="small"
        sx={{
          minWidth: 240,

          "& .MuiOutlinedInput-root": {
            borderRadius: "14px",
            backgroundColor: "#fff",
            transition: "all .2s ease",

            "&:hover": {
              backgroundColor: "#fafafa",
            },
          },

          "& .MuiAutocomplete-input": {
            fontSize: "14px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select category..."
          />
        )}
      />

      {/* Status */}

      <FormControl
        size="small"
        sx={{
          minWidth: 180,
        }}
      >
        <Select
          value={filters.status}
          onChange={handleStatusChange}
          sx={{
            borderRadius: "14px",
            backgroundColor: "#fff",

            "& .MuiSelect-select": {
              py: 1.2,
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        >
          {STATUS_OPTIONS.map((status) => (
            <MenuItem
              key={status.value}
              value={status.value}
            >
              {status.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}