import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import api from '../../utils/api'

const AvatarUpload = ({ onUploadSuccess, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setError(null)
    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('avatar', selectedFile)

      // Don't set Content-Type header - let axios set it automatically with boundary
      const response = await api.post('/users/upload-avatar', formData)

      if (response.data) {
        onUploadSuccess(response.data)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError(error.response?.data?.message || 'Failed to upload avatar. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="bg-black/90 backdrop-blur-sm border-2 border-blue-600/50 rounded-xl p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-300 star-wars-title">
          Upload Profile Picture
        </h3>
        <button
          onClick={onCancel}
          className="text-blue-200/70 hover:text-blue-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-blue-200 mb-2">
            Select Image
          </label>
          <div className="flex items-center space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="flex-1 cursor-pointer bg-blue-900/30 hover:bg-blue-900/50 border-2 border-blue-600/50 rounded-sm px-4 py-3 text-blue-200 text-center transition-colors"
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Choose File</span>
              </div>
            </label>
          </div>
          <p className="text-xs text-blue-200/60 mt-1">
            JPEG, PNG, GIF, or WebP (max 5MB)
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="relative">
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Preview
            </label>
            <div className="relative w-full h-48 bg-blue-900/20 border-2 border-blue-600/30 rounded-sm overflow-hidden flex items-center justify-center">
              <img
                src={preview}
                alt="Avatar preview"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                title="Remove"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 border border-red-600/50 rounded-sm p-3">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-900 disabled:to-blue-900 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/50 flex items-center justify-center space-x-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-4 h-4" />
                <span>Upload</span>
              </>
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={isUploading}
            className="px-6 py-3 bg-blue-900/30 hover:bg-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-blue-600/50 text-blue-200 rounded-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarUpload

