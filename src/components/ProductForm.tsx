// components/ProductForm.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Upload from "@/components/atoms/Upload";
import {
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/features/productSlice";

export default function ProductForm({ productId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products, product, loading, error } = useSelector(
    (state) => state.products
  );
  const [uploadUrl, setUploadUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    base_price: 0,
    image_url: "",
    options: [],
  });

  const handleUpload = (url) => {
    setUploadUrl(url); // Menyimpan URL gambar yang diterima dari komponen UploadImage
    setFormData((prevData) => ({
      ...prevData,
      image_url: url,
    }));
  };

  useEffect(() => {
    if (productId) {
      const existingProduct = products.find((p) => p.id === productId);
      if (existingProduct) {
        setFormData(existingProduct);
      } else {
        dispatch(fetchProductById(productId));
      }
    }
  }, [productId, products, dispatch]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (productId) {
      dispatch(updateProduct({ id: productId, updatedProduct: formData }));
    } else {
      dispatch(createProduct(formData));
    }
    router.push("/"); // Kembali ke halaman utama setelah submit
  }

  function handleDelete() {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      router.push("/"); // Kembali ke halaman utama setelah delete
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <label className="block text-gray-700 font-bold mb-2">
              Options:
            </label>
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
                      onClick={() => removeOptionValue(optionIndex, valueIndex)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove Value
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOptionValue(optionIndex)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add Value
                </button>
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Add Option
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {productId ? "Update Product" : "Create Product"}
          </button>
          {productId && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Product
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
