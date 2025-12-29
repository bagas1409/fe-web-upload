import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Images() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Assuming GET /images returns a list of objects like { _id, url, createdAt, ... }
      const res = await api.get("/images");
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load images");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // POST /images/upload based on Dashboard code from previous version
      await api.post("/images/upload", formData);
      toast.success("Image uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
      fetchImages();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // id is likely _id or filename depending on backend, using _id as per previous code
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    setIsDeleting(id);
    try {
      await api.delete(`/images/${id}`);
      toast.success("Image deleted successfully");
      fetchImages();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete image");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-slate-50 relative">
      {/* Background Decor */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 animate-fadeIn">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Gallery</h1>
            <p className="text-slate-500 text-lg">Manage and view your uploaded collection.</p>
          </div>

          <div className="glass-panel p-2 rounded-xl flex items-center gap-2 bg-white/60">
            <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <span>Select Image</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            {selectedFile && (
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Uploading..." : "Upload Now"}
              </button>
            )}
          </div>
        </header>

        {preview && (
          <div className="glass-panel p-4 rounded-xl mb-10 max-w-sm mx-auto animate-fadeIn relative group">
            <button onClick={() => { setPreview(null); setSelectedFile(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img src={preview} alt="Preview" className="w-full h-auto rounded-lg object-cover" />
            <p className="text-center text-xs text-slate-500 mt-2">{selectedFile.name}</p>
          </div>
        )}

        {images.length === 0 && !isLoading ? (
          <div className="glass-panel p-12 rounded-2xl text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            </div>
            <h3 className="text-xl font-medium text-slate-700 mb-1">No images yet</h3>
            <p className="text-slate-500">Upload your first image to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div key={img._id || img.id} className="glass-panel p-3 rounded-xl group hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="aspect-square rounded-lg overflow-hidden bg-slate-100 mb-3 relative">
                  <img
                    src={img.url}
                    alt="Uploaded"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <a href={img.url} target="_blank" rel="noreferrer" className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/40 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <button
                      onClick={() => handleDelete(img._id || img.id)}
                      disabled={isDeleting === (img._id || img.id)}
                      className="p-2 bg-red-500/80 backdrop-blur-sm rounded-lg text-white hover:bg-red-600 transition-colors"
                    >
                      {isDeleting === (img._id || img.id) ? (
                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">IMG_{img._id || img.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
