import React, { useState } from "react";
import { useClients } from "../hooks/useClients";
import { useDebounce } from "../hooks/useDebounce";
import { Search, Plus, Users, LayoutGrid, Table } from "lucide-react";

import { ClientFormModal } from "../components/ClientFromModal";
import { ClientGridView } from "../components/ClientGridView";
import { ClientTableView } from "../components/ClientTableView";
import { ClientDeleteModal } from "../components/ClientDeleteModal";

import { Spinner, useDisclosure } from "@heroui/react";

export const Dashboard = () => {
  const {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    isLoadingClients,
  } = useClients();
  const { data: clients = [] } = getClients;

  const {
    isOpen: isAddEditModalOpen,
    onOpen: onAddEditModalOpen,
    onOpenChange: onAddEditModalOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();

  const [selectedClient, setSelectedClient] = useState(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const debouncedSearch = useDebounce(search, 300);

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalClients = filteredClients.length;
  const totalPages = Math.ceil(totalClients / pageSize);

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFormSubmit = (data) => {
    if (selectedClient.id) {
      updateClient.mutate({ id: selectedClient.id, data });
    } else {
      addClient.mutate(data);
    }
    setSelectedClient(null);
  };

  const onDelete = () => {
    if (selectedClient) {
      deleteClient.mutate(selectedClient.id);
    }
  };

  const openEditModal = (client) => {
    setSelectedClient(client);
    onAddEditModalOpen();
  };

  const openDeleteModal = (client) => {
    setSelectedClient(client);
    onDeleteModalOpen();
  };

  if (isLoadingClients) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Spinner
          classNames={{ label: "text-foreground mt-4" }}
          label="Loading clients, please wait..."
          variant="wave"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm   p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-blue-600 rounded-xl p-3 mr-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Client Management
              </h1>
              <p className="text-gray-600 mt-1">
                {clients.length} {clients.length === 1 ? "client" : "clients"}{" "}
                total
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setSelectedClient({
                  name: "",
                  email: "",
                  phone: "",
                  tags: [""],
                  address: {
                    city: "",
                    state: "",
                    zip: "",
                  },
                });
                onAddEditModalOpen();
              }}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Client
            </button>
            <button
              onClick={() => setView(view === "grid" ? "table" : "grid")}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-gray-700 hover:bg-gray-100 shadow-sm transition"
            >
              {view === "grid" ? (
                <>
                  <Table className="h-5 w-5 text-blue-600" />
                  <span>Switch to Table</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="h-5 w-5 text-blue-600" />
                  <span>Switch to Grid</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="w-80 bg-white rounded-2xl shadow-sm p-2 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3  rounded-xl   transition-all"
            />
          </div>
        </div>
        {isLoadingClients ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner
              variant="wave"
              label="Loading clients, please wait..."
              classNames={{ label: "text-foreground mt-4 text-sm" }}
            />
          </div>
        ) : view === "grid" ? (
          <ClientGridView
            clients={paginatedClients}
            currentPage={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={filteredClients.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        ) : (
          <ClientTableView
            clients={paginatedClients}
            currentPage={currentPage}
            pageSize={pageSize}
            totalClients={totalClients}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        )}
      </div>

      <ClientFormModal
        isOpen={isAddEditModalOpen}
        onOpenChange={(isOpen) => {
          onAddEditModalOpenChange(isOpen);
          if (!isOpen) {
            setSelectedClient(null);
          }
        }}
        onSubmit={handleFormSubmit}
        selectedClient={selectedClient}
      />

      <ClientDeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={(isOpen) => {
          onDeleteModalOpenChange(isOpen);
          if (!isOpen) {
            setSelectedClient(null);
          }
        }}
        onDelete={onDelete}
        selectedClient={selectedClient}
      />
    </div>
  );
};
