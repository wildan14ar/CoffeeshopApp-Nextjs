// components/ProductForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ productId }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_price: 0,
    image_url: "",
    options: [],
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  async function fetchProduct() {
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();
    setFormData(data);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleOptionChange(index, e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = { ...newOptions[index], [name]: value };
      return { ...prevData, options: newOptions };
    });
  }

  function handleOptionValueChange(optionIndex, valueIndex, e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[optionIndex].values[valueIndex] = {
        ...newOptions[optionIndex].values[valueIndex],
        [name]: name === "additional_price" ? parseFloat(value) : value,
      };
      return { ...prevData, options: newOptions };
    });
  }

  function addOption() {
    setFormData((prevData) => ({
      ...prevData,
      options: [...prevData.options, { name: "", values: [] }],
    }));
  }

  function removeOption(index) {
    setFormData((prevData) => ({
      ...prevData,
      options: prevData.options.filter((_, i) => i !== index),
    }));
  }

  function addOptionValue(optionIndex) {
    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[optionIndex].values.push({ value: "", additional_price: 0 });
      return { ...prevData, options: newOptions };
    });
  }

  function removeOptionValue(optionIndex, valueIndex) {
    setFormData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[optionIndex].values = newOptions[optionIndex].values.filter(
        (_, i) => i !== valueIndex
      );
      return { ...prevData, options: newOptions };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = productId ? `/api/products/${productId}` : "/api/products";
    const method = productId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Error saving product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/");
        } else {
          console.error("Error deleting product");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[800px] mx-auto p-4 bg-white shadow-md rounded"
    >
      <div className="flex flex-col md:flex-row md:gap-10">
        <div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="base_price"
              className="block text-gray-700 font-bold mb-2"
            >
              Base Price:
            </label>
            <input
              type="number"
              id="base_price"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image_url"
              className="block text-gray-700 font-bold mb-2"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={formData.image_url || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Product Options</h3>

          {formData.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-4 p-4 bg-gray-100 rounded-md">
              <div className="mb-2">
                <input
                  type="text"
                  name="name"
                  value={option.name}
                  onChange={(e) => handleOptionChange(optionIndex, e)}
                  placeholder="Option Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <button
                type="button"
                onClick={() => removeOption(optionIndex)}
                className="text-red-500 text-sm"
              >
                Remove Option
              </button>

              <h4 className="mt-2 mb-2 font-bold">Option Values</h4>
              {option.values.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="flex flex-col md:flex-row gap-2 mb-2"
                >
                  <input
                    type="text"
                    name="value"
                    value={value.value}
                    onChange={(e) =>
                      handleOptionValueChange(optionIndex, valueIndex, e)
                    }
                    placeholder="Value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="additional_price"
                    value={value.additional_price}
                    onChange={(e) =>
                      handleOptionValueChange(optionIndex, valueIndex, e)
                    }
                    placeholder="Additional Price"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeOptionValue(optionIndex, valueIndex)}
                    className="text-red-500 text-sm text-left"
                  >
                    Remove Value
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addOptionValue(optionIndex)}
                className="text-indigo-500 text-sm"
              >
                Add Value
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addOption}
            className="text-indigo-500 text-sm mb-4"
          >
            Add Option
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
      >
        Save Product
      </button>

      {productId && (
        <button
          type="button"
          onClick={handleDelete}
          className="w-full mt-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Delete Product
        </button>
      )}
    </form>
  );
}
