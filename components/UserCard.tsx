import styles from './UserCard.module.css';
import CardContainer from './CardContainer';
import Button from './Button';
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  StarIcon, 
  HeartIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface UserCardProps {
  name: string;
  email: string;
  image: string;
  role: string;
  location: string;
  rating: number;
  isOnline: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  onContact?: () => void;
  onViewProfile?: () => void;
}

export default function UserCard({ 
  name, 
  email, 
  image, 
  role, 
  location, 
  rating, 
  isOnline,
  isFavorite = false,
  onToggleFavorite,
  onShare,
  onContact,
  onViewProfile
}: UserCardProps) {
  return (
    <CardContainer className={`${styles.card} hover:scale-[1.02] transition-transform duration-300`}>
      {/* Header profesional */}
      <div className={`${styles.header} h-28 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 relative`}>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={onToggleFavorite}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
            title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-4 h-4 text-red-400" />
            ) : (
              <HeartIcon className="w-4 h-4 text-white" />
            )}
          </button>
          <button 
            onClick={onShare}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all"
            title="Compartir perfil"
          >
            <ShareIcon className="w-4 h-4 text-white" />
          </button>
        </div>
        {isOnline && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-emerald-600 px-3 py-1 rounded-full">
            <div className={styles.pulse}></div>
            <span className="text-white text-xs font-medium">En línea</span>
          </div>
        )}
      </div>
      
      {/* Avatar */}
      <div className="relative -mt-14 flex justify-center">
        <div className="relative">
          <img 
            src={image} 
            alt={name}
            className={`${styles.avatar} w-28 h-28 rounded-xl border-4 border-white shadow-lg object-cover`}
          />
          <div className="absolute -bottom-1 -right-1 bg-amber-500 p-1.5 rounded-lg shadow-md">
            <StarSolidIcon className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-5 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-1">{name}</h2>
        
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
          <BriefcaseIcon className="w-3.5 h-3.5" />
          <span className="font-medium text-sm">{role}</span>
        </div>
        
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <EnvelopeIcon className="w-3.5 h-3.5" />
            <span>{email}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            i < rating ? (
              <StarSolidIcon key={i} className="w-4 h-4 text-amber-500" />
            ) : (
              <StarIcon key={i} className="w-4 h-4 text-gray-300" />
            )
          ))}
          <span className="ml-2 text-slate-700 font-semibold text-sm">{rating}.0</span>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            icon={EnvelopeIcon} 
            className="flex-1"
            onClick={onContact}
          >
            Contactar
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewProfile}
          >
            Ver Perfil
          </Button>
        </div>
      </div>
    </CardContainer>
  );
}