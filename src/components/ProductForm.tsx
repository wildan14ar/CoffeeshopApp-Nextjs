"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Upload from "@/components/atoms/Upload";
import Loader from "@/components/atoms/Loader";


export default function ProductForm({ productId }) {
  const router = useRouter();
  const [uploadUrl, setUploadUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_price: 0,
    image_url: "",
    options: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = (url) => {
    setUploadUrl(url); // Set uploaded image URL
    setFormData((prevData) => ({
      ...prevData,
      image_url: url,
    }));
  };

  // Fetch product data by ID when `productId` is provided
  useEffect(() => {
    if (productId) {
      const fetchProductById = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/product/${productId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          const productData = await response.json();
          setFormData(productData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProductById();
    }
  }, [productId]);

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
      const newOptions = prevData.options.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            [name]: value,
          };
        }
        return option;
      });
      return { ...prevData, options: newOptions };
    });
  }

  function handleOptionValueChange(optionIndex, valueIndex, e) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newOptions = prevData.options.map((option, idx) => {
        if (idx === optionIndex) {
          const newValues = option.values.map((val, vIdx) => {
            if (vIdx === valueIndex) {
              return {
                ...val,
                [name]: name === "additional_price" ? parseFloat(value) : value,
              };
            }
            return val;
          });
          return {
            ...option,
            values: newValues,
          };
        }
        return option;
      });
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
      const newOptions = prevData.options.map((option, idx) => {
        if (idx === optionIndex) {
          return {
            ...option,
            values: [...option.values, { value: "", additional_price: 0 }],
          };
        }
        return option;
      });
      return { ...prevData, options: newOptions };
    });
  }

  function removeOptionValue(optionIndex, valueIndex) {
    setFormData((prevData) => {
      const newOptions = prevData.options.map((option, idx) => {
        if (idx === optionIndex) {
          return {
            ...option,
            values: option.values.filter((_, vIdx) => vIdx !== valueIndex),
          };
        }
        return option;
      });
      return { ...prevData, options: newOptions };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (productId) {
        // Update product if `productId` is provided
        const response = await fetch(`/api/product/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
      } else {
        // Create new product if no `productId`
        const response = await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to create product");
        }
      }
      router.push("/"); // Navigate to homepage after submission
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        router.push("/"); // Navigate to homepage after deletion
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  if (loading) return <Loader />  ;
  if (error) return <p>Error: {error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[800px] mx-auto p-4 shadow-md rounded"
    >
      <div className="flex flex-col md:gap-10">
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="base_price" className="block font-bold mb-2">
              Base Price:
            </label>
            <input
              type="number"
              id="base_price"
              name="base_price"
              value={formData.base_price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image_url" className="block font-bold mb-2">
              Image:
            </label>
            {uploadUrl && (
              <div>
                <h3>Uploaded Image</h3>
                <img
                  src={uploadUrl}
                  alt="Uploaded"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <p>URL: {uploadUrl}</p>
              </div>
            )}
            <Upload onUpload={handleUpload} />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Options:</label>
            {formData.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={option.name}
                  onChange={(e) => handleOptionChange(optionIndex, e)}
                  placeholder="Option Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                />
                {option.values.map((value, valueIndex) => (
                  <div key={valueIndex} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      name="value"
                      value={value.value}
                      onChange={(e) =>
                        handleOptionValueChange(optionIndex, valueIndex, e)
                      }
                      placeholder="Value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      name="additional_price"
                      value={value.additional_price}
                      onChange={(e) =>
                        handleOptionValueChange(optionIndex, valueIndex, e)
                      }
                      placeholder="Additional Price"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeOptionValue(optionIndex, valueIndex)
                      }
                      className="px-3 py-2 bg-red-500 text-white rounded-md"
                    >
                      Remove Value
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOptionValue(optionIndex)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Value
                </button>
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Option
            </button>
          </div>

          <div className="flex w-full justify-end gap-4">
            {productId && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className=" w-full px-4 py-2 bg-green-500 text-white rounded-md"
            >
              {productId ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
