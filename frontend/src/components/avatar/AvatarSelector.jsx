import { useState } from 'react'
import { X, Check } from 'lucide-react'
import { starWarsAvatars, getAvatarById, hasAvatarImage } from '../../data/starWarsAvatars'

const AvatarSelector = ({ currentAvatar, onSelect, onClose }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || 'yoda')

  const handleSelect = () => {
    onSelect(selectedAvatar)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900/95 via-slate-900/95 to-black border-2 border-blue-600/50 rounded-sm p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto metallic-texture">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-300 mb-1 star-wars-title">
              Choose Your Avatar
            </h2>
            <p className="text-blue-200/80 text-sm">
              Select a Star Wars character to represent you
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200/70 hover:text-blue-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 mb-6">
          {starWarsAvatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setSelectedAvatar(avatar.id)}
              className={`relative p-4 rounded-sm border-2 transition-all duration-200 ${
                selectedAvatar === avatar.id
                  ? 'border-blue-400 bg-blue-900/50 shadow-lg shadow-blue-500/50 scale-105'
                  : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600 hover:bg-blue-900/30'
              }`}
            >
              {avatar.image ? (
                <div className="w-full h-16 flex items-center justify-center mb-2">
                  <img 
                    src={avatar.image} 
                    alt={avatar.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback to emoji if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="text-4xl hidden">{avatar.emoji}</div>
                </div>
              ) : (
                <div className="text-4xl mb-2">{avatar.emoji}</div>
              )}
              <div className="text-xs text-blue-200 font-medium truncate">
                {avatar.name}
              </div>
              {selectedAvatar === avatar.id && (
                <div className="absolute top-2 right-2 bg-blue-400 rounded-full p-1">
                  <Check className="w-3 h-3 text-blue-900" />
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedAvatar && (
          <div className="bg-black/40 rounded-sm p-4 mb-6 border border-blue-700/50">
            <div className="flex items-center space-x-4">
              {hasAvatarImage(selectedAvatar) ? (
                <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getAvatarById(selectedAvatar).image} 
                    alt={getAvatarById(selectedAvatar).name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="text-5xl hidden">{getAvatarById(selectedAvatar).emoji}</div>
                </div>
              ) : (
                <div className="text-5xl">{getAvatarById(selectedAvatar).emoji}</div>
              )}
              <div>
                <h3 className="text-xl font-bold text-blue-300 mb-1">
                  {getAvatarById(selectedAvatar).name}
                </h3>
                <p className="text-blue-200/70 text-sm">
                  {getAvatarById(selectedAvatar).description}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={handleSelect}
            className="flex-1 btn-primary"
          >
            Select Avatar
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default AvatarSelector

