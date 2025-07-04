import React from "react";
import { Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { Chip } from "@heroui/react";
import { PaginationControls } from "./PaginationControls";

export const ClientGridView = ({
  clients,           
  currentPage,
  totalPages,
  pageSize,
  totalItems,     
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-6">
      {/* Grid of client cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-2 py-2 mr-4 flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${client.name}&background=6C63FF&color=fff&bold=true`}
                    alt={client.name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 capitalize">
                  {client.name}
                </h3>
              </div>

              <div className="flex space-x-2 transition">
                <button
                  onClick={() => onEdit(client)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(client)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-gray-800">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-indigo-400" />
                <span className="text-sm">
                  {client.address.city}, {client.address.state}{" "}
                  {client.address.zip}
                </span>
              </div>
            </div>

            {client.tags.length > 0 && (
              <div className="mt-4 pt-4">
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag, index) => (
                    <Chip key={index} className="mr-2">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
