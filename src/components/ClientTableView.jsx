import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Chip } from '@heroui/react';

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
                {client.address.city}, {client.address.state}{' '}
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

      <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
        <div className="text-sm text-gray-600">
          Showing {(currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, totalClients)} of {totalClients}{' '}
          results
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg text-sm disabled:bg-gray-100 disabled:text-gray-400"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg text-sm disabled:bg-gray-100 disabled:text-gray-400"
          >
            Next
          </button>
          <select
            className="text-sm rounded-lg p-1"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
