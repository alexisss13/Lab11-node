"use client";

import { useState } from "react";
import UserCard from "@/components/UserCard";
import Button from "@/components/Button";
import {
  PlusIcon,
  FunnelIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ana López",
      email: "ana.lopez@ejemplo.com",
      image: "https://i.pravatar.cc/300?img=1",
      role: "Diseñadora UX/UI",
      location: "Madrid, España",
      rating: 5,
      isOnline: true,
      isFavorite: false,
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      email: "carlos.m@ejemplo.com",
      image: "https://i.pravatar.cc/300?img=12",
      role: "Desarrollador Full Stack",
      location: "Barcelona, España",
      rating: 4,
      isOnline: true,
      isFavorite: false,
    },
    {
      id: 3,
      name: "María García",
      email: "maria.garcia@ejemplo.com",
      image: "https://i.pravatar.cc/300?img=5",
      role: "Product Manager",
      location: "Valencia, España",
      rating: 5,
      isOnline: false,
      isFavorite: false,
    },
    {
      id: 4,
      name: "Javier Torres",
      email: "javier.t@ejemplo.com",
      image: "https://i.pravatar.cc/300?img=13",
      role: "Data Scientist",
      location: "Sevilla, España",
      rating: 4,
      isOnline: true,
      isFavorite: false,
    },
  ]);

  const [filterOnline, setFilterOnline] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filtrar usuarios
  const filteredUsers = filterOnline ? users.filter((u) => u.isOnline) : users;

  // Toggle favorito
  const toggleFavorite = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isFavorite: !user.isFavorite } : user
      )
    );
  };

  // Compartir perfil
  const handleShare = (user: (typeof users)[0]) => {
    if (navigator.share) {
      navigator
        .share({
          title: `Perfil de ${user.name}`,
          text: `Conoce a ${user.name}, ${user.role}`,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback: copiar al portapapeles
          navigator.clipboard.writeText(`${user.name} - ${user.email}`);
          alert("¡Perfil copiado al portapapeles!");
        });
    } else {
      navigator.clipboard.writeText(`${user.name} - ${user.email}`);
      alert("¡Perfil copiado al portapapeles!");
    }
  };

  // Contactar usuario
  const handleContact = (email: string) => {
    window.open(`mailto:${email}`);
  };

  // Ver perfil
  const handleViewProfile = (user: (typeof users)[0]) => {
    alert(
      `Abriendo perfil de ${user.name}...\n\nEn una app real, esto navegaría a /perfil/${user.id}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header con Logo */}
      <header className="bg-slate-800 shadow-lg border-b-4 border-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo y Nombre de Marca */}
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-3 rounded-xl shadow-lg">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  TeamConnect
                  <span className="text-emerald-400 text-sm font-normal">
                    Pro
                  </span>
                </h1>
                <p className="text-slate-400 text-xs font-medium">
                  Gestión Profesional de Equipos
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button
                variant={filterOnline ? "success" : "secondary"}
                icon={FunnelIcon}
                onClick={() => setFilterOnline(!filterOnline)}
              >
                {filterOnline ? "Mostrando En Línea" : "Filtrar"}
              </Button>
              <Button
                variant="primary"
                icon={PlusIcon}
                onClick={() => setShowAddModal(true)}
              >
                Añadir Usuario
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Título de sección */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ChartBarIcon className="w-6 h-6 text-slate-700" />
            <h2 className="text-2xl font-bold text-slate-800">
              Panel de Control
            </h2>
          </div>
          <p className="text-slate-600 text-sm">
            Estadísticas en tiempo real de tu equipo
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Usuarios */}
          <div className="bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-emerald-500">
            <p className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wider">
              Total Usuarios
            </p>
            <p className="text-white text-4xl font-bold mb-1">{users.length}</p>
            <p className="text-emerald-400 text-xs font-medium">
              Miembros activos
            </p>
          </div>

          {/* En Línea */}
          <div className="bg-emerald-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-emerald-400">
            <p className="text-emerald-100 text-xs font-semibold mb-1 uppercase tracking-wider">
              En Línea
            </p>
            <p className="text-white text-4xl font-bold mb-1">
              {users.filter((u) => u.isOnline).length}
            </p>
            <p className="text-emerald-200 text-xs font-medium">
              Conectados ahora
            </p>
          </div>

          {/* Rating Promedio */}
          <div className="bg-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-amber-500">
            <p className="text-slate-300 text-xs font-semibold mb-1 uppercase tracking-wider">
              Rating Promedio
            </p>
            <p className="text-white text-4xl font-bold mb-1">
              {(
                users.reduce((acc, u) => acc + u.rating, 0) / users.length
              ).toFixed(1)}
            </p>
            <p className="text-amber-300 text-xs font-medium">
              Valoración general
            </p>
          </div>
        </div>

        {/* Título de sección de usuarios */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <UserGroupIcon className="w-6 h-6 text-slate-700" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Nuestro Equipo
                </h2>
              </div>
              <p className="text-slate-600 text-sm">
                {filterOnline
                  ? `Mostrando ${filteredUsers.length} usuario(s) en línea`
                  : "Conoce a los profesionales que hacen esto posible"}
              </p>
            </div>
          </div>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              {...user}
              onToggleFavorite={() => toggleFavorite(user.id)}
              onShare={() => handleShare(user)}
              onContact={() => handleContact(user.email)}
              onViewProfile={() => handleViewProfile(user)}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No hay usuarios en línea en este momento
            </p>
          </div>
        )}
      </main>

      {/* Modal Añadir Usuario */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Añadir Nuevo Usuario
            </h3>
            <p className="text-slate-600 mb-6">
              Esta funcionalidad estará disponible próximamente. Por ahora es
              una demostración.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  alert("Funcionalidad en desarrollo");
                  setShowAddModal(false);
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer con branding */}
      <footer className="bg-slate-800 mt-20 border-t-4 border-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Logo en footer */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-2 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              TeamConnect Pro
            </span>
          </div>

          <p className="text-slate-400 text-sm text-center mb-2">
            La plataforma líder en gestión profesional de equipos
          </p>

          <div className="flex items-center justify-center gap-6 text-slate-500 text-xs mb-4">
            <button
              onClick={() => alert("Términos y condiciones")}
              className="hover:text-emerald-400 transition-colors"
            >
              Términos
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Política de privacidad")}
              className="hover:text-emerald-400 transition-colors"
            >
              Privacidad
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Contacta con soporte")}
              className="hover:text-emerald-400 transition-colors"
            >
              Soporte
            </button>
            <span>•</span>
            <button
              onClick={() => alert("Información de contacto")}
              className="hover:text-emerald-400 transition-colors"
            >
              Contacto
            </button>
          </div>

          <p className="text-slate-500 text-xs text-center">
            © 2025 TeamConnect Pro. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
