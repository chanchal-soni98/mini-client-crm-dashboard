import React from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/react";
import { PaginationControls } from "./PaginationControls";

export const ClientTableView = ({
  clients,
  currentPage,
  pageSize,
  totalClients,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
  onPageSizeChange,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <Table aria-label="Clients">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Tags</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow className="hover:bg-gray-100" key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                {client.address.city}, {client.address.state}{" "}
                {client.address.zip}
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {client.tags.map((tag, index) => (
                    <Chip key={index} className="mr-2">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={() => onEdit(client)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4 inline" />
                  </button>
                  <button
                    onClick={() => onDelete(client)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4 inline" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalClients}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
};
